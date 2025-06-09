'use client';

import { ShoppingBag } from 'lucide-react';
import CartEmpty from '@/components/cart/CartEmpty';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CartError from '@/components/cart/CartError';
import CartLoading from '@/components/cart/CartLoading';
import useShopStore from '@/store/shopStore';
import { useEffect } from 'react';

export default function CartPage() {
  const { 
    cartItem, 
    products,
    cartProducts,
    subtotal,
    loading,
    error
  } = useShopStore();

  useEffect(() => {
    // Update cart products and subtotal when cart or products change
    const updateCartDetails = () => {
      const productsInCart = products
        .filter((product) => cartItem[product.id] > 0)
        .map(product => ({
          ...product,
          quantity: cartItem[product.id]
        }));
      
      const newSubtotal = productsInCart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );

      useShopStore.setState({ 
        cartProducts: productsInCart,
        subtotal: newSubtotal
      });
    };

    updateCartDetails();
  }, [cartItem, products]);

  if (loading) return <CartLoading />;
  if (error) return <CartError message={error} />;
  if (cartProducts.length === 0) return <CartEmpty />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartProducts.map((product) => (
            <CartItem
              key={product.id}
              {...product}
              category={product.category}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <CartSummary 
            subtotal={subtotal} 
            itemCount={cartProducts.length} 
          />
        </div>
      </div>
    </div>
  );
}