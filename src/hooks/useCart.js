import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function useCart(cartItems) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  // Fetch products from Firestore
  useEffect(() => {
    setLoading(true);
    
    const unsubscribeProducts = onSnapshot(
      collection(db, 'laptopCollection'),
      (snapshot) => {
        try {
          const productsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            collection: 'laptopCollection',
          }));

          const unsubscribeAccessories = onSnapshot(
            collection(db, 'laptop-accessories'),
            (snapshot) => {
              const accessoriesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                collection: 'laptop-accessories',
              }));

              setProducts([...productsList, ...accessoriesList]);
              setLoading(false);
            },
            (err) => {
              setError(err.message);
              setLoading(false);
            }
          );

          return () => unsubscribeAccessories();
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      }
    );

    return () => unsubscribeProducts();
  }, []);

  // Calculate subtotal whenever cart items or products change
  useEffect(() => {
    const total = products.reduce((sum, product) => {
      const quantity = cartItems[product.id] || 0;
      return sum + product.price * quantity;
    }, 0);
    
    setSubtotal(total);
  }, [cartItems, products]);

  // Get cart items with product details
  const cartProducts = products.filter(
    (product) => cartItems[product.id] > 0
  ).map(product => ({
    ...product,
    quantity: cartItems[product.id]
  }));

  return {
    cartProducts,
    subtotal,
    loading,
    error
  };
}