'use client'; 
 
import { create } from 'zustand'; 
import { db, auth } from '@/lib/firebase'; 
import { onSnapshot, collection, addDoc, query, where, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { toast } from "react-toastify"; 
 
const collections = ["laptopCollection", "laptop-accessories"]; 
 
const useShopStore = create((set, get) => ({ 
  // State 
  cartItem: (() => { 
    if (typeof window !== 'undefined') { 
      const storedCart = localStorage.getItem('cartItems'); 
      return storedCart ? JSON.parse(storedCart) : {}; 
    } 
    return {}; 
  })(), 
  cartProducts: [], 
  subtotal: 0, 
  products: [], 
  laptopsList: [], 
  accessoriesList: [], 
  currentUser: null, 
  favorites: [], 
  favoritesLoading: true, 
  trending: [], 
  cartItemCount: 0, 
  loading: false, 
  error: null, 
 
  // Actions 
  // Item in Cart
  setCartItem: (newCart) => { 
    set({ cartItem: newCart }); 
    if (typeof window !== 'undefined') { 
      localStorage.setItem('cartItems', JSON.stringify(newCart)); 
    } 
  }, 
 
  // SignIn With Google
  signInWithGoogle: async () => { 
    const provider = new GoogleAuthProvider(); 
    try { 
      const result = await signInWithPopup(auth, provider); 
      set({ currentUser: result.user }); 
      console.log(`currentUser: ${result.user.uid}`);
    } catch (error) { 
      console.error("Error during Google sign-in:", error); 
    } 
  }, 
 
  // Get Product Details
  getProductDetails: async (productId) => { 
    for (const collectionName of collections) { 
      const productRef = doc(db, collectionName, productId); 
      const productSnapshot = await getDoc(productRef); 
      if (productSnapshot.exists()) { 
        return { ...productSnapshot.data(), collection: collectionName, productId }; 
      } 
    } 
    return null; 
  }, 

  // To Add product to Favorite List or remove it 
  toggleFavorite: async (productId) => {
    const { currentUser, favorites } = get();
  
    if (!currentUser) {
      toast.error("You need to be logged in to manage favorites.");
      return null;
    }
  
    try {
      const existingFavorite = favorites.find(fav => fav.productId === productId);
  
      if (existingFavorite) {
        await deleteDoc(doc(db, "favorites", existingFavorite.favId));
  
        set(state => ({
          favorites: state.favorites.filter(fav => fav.productId !== productId)
        }));
  
        toast.info("Removed from favorites.", { autoClose: 1500 });
        return false;
      }
  
      const newFavorite = {
        userId: currentUser.uid,
        productId,
        createdAt: new Date().toISOString()
      };
  
      const docRef = await addDoc(collection(db, "favorites"), newFavorite);
  
      const productDetails = await get().getProductDetails(productId);
  
      if (productDetails) {
        const favoriteItem = {
          ...productDetails,
          favId: docRef.id
        };
  
        set(state => ({
          favorites: [...state.favorites, favoriteItem]
        }));
  
        toast.success("Added to favorites!", { autoClose: 1500 });
        return true;
      } else {
        toast.error("Product details not found.");
        return null;
      }
  
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites.");
      return null;
    }
  },
  
  // Find out if this product is preferred.
  isFavorite: (productId) => { 
    const { favorites } = get(); 
    return favorites.some((fav) => fav.productId === productId); 
  }, 
 
  // Add products to Cart 
  addToCart: (itemId) => { 
    if (!itemId) { 
      console.error("Invalid itemId provided"); 
      return; 
    } 
 
    set((state) => { 
      const newCart = { 
        ...state.cartItem, 
        [itemId]: (state.cartItem[itemId] || 0) + 1 
      }; 
       
      // Save to localStorage 
      localStorage.setItem('cartItems', JSON.stringify(newCart)); 
       
      // Calculate new count 
      const newCount = Object.values(newCart).filter(value => value > 0).length; 
       
      return { 
        cartItem: newCart, 
        cartItemCount: newCount 
      }; 
    }); 
  }, 
 
  // remove products from Cart 
  removeFromCart: (itemId) => {
    set((state) => {
      const updatedCart = { ...state.cartItem };
      delete updatedCart[itemId]; 
  
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  
      const newCount = Object.values(updatedCart).filter(value => value > 0).length;
  
      return {
        cartItem: updatedCart,
        cartItemCount: newCount
      };
    });
  },

  // Decrease the quantity of the product in the cart by one
  DecreaseTheQuantityOfProduct: (itemId) => {
    set((state) => {
      const updatedCart = { ...state.cartItem };

      const currentQuantity = updatedCart[itemId] || 0;
      const newQuantity = Math.max(currentQuantity - 1, 0);

      updatedCart[itemId] = newQuantity;

      localStorage.setItem('cartItems', JSON.stringify(updatedCart));

      return {
        cartItem: updatedCart,
      };
    });
  },

  // updateQuantityCartItem , it use with input filed
  updateQuantityCartItem: (itemId, newAmount) => { 
    const { cartItem } = get(); 
    const updatedCart = { ...cartItem, [itemId]: newAmount }; 
    if (newAmount === 0) { 
      delete updatedCart[itemId]; 
    } 
    get().setCartItem(updatedCart); 
  }, 

  // Clear Cart
  clearCart: () => { 
    set({ cartItem: {}, cartItemCount: 0 }); 
    localStorage.removeItem('cartItems'); 
  }, 

  // updateCartDetails 
  updateCartDetails: () => { 
    const { cartItem, products } = get(); 
    const productsInCart = products 
      .filter((product) => cartItem[product.id] > 0) 
      .map(product => ({ 
        ...product, 
        quantity: cartItem[product.id] 
      })); 
   
    const total = productsInCart.reduce( 
      (sum, product) => sum + product.price * product.quantity, 
      0 
    ); 

    set({ 
      cartProducts: productsInCart, 
      subtotal: total 
    }); 
  }, 
   
  // Initialize store 
  initialize: () => { 
    // Set up auth listener 
    const auth = getAuth(); 
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => { 
      if (user) { 
        set({ currentUser: user, favoritesLoading: true }); 
        // Set up favorites listener immediately when user is authenticated 
        const favoritesQuery = query( 
          collection(db, "favorites"), 
          where("userId", "==", user.uid) 
        ); 
 
        const unsubscribeFavorites = onSnapshot(favoritesQuery, 
          async (snapshot) => { 
            try { 
              const favoriteProductPromises = snapshot.docs.map(async (favDoc) => { 
                const productId = favDoc.data().productId; 
                const productDetails = await get().getProductDetails(productId); 
                return productDetails 
                  ? { ...productDetails, favId: favDoc.id } 
                  : null; 
              }); 
 
              const favoriteProducts = await Promise.all(favoriteProductPromises); 
              set({  
                favorites: favoriteProducts.filter(product => product !== null), 
                favoritesLoading: false  
              }); 
            } catch (error) { 
              console.error("Error fetching favorites:", error); 
              set({ favoritesLoading: false }); 
              toast.error("Failed to load favorites"); 
            }
          },
          (error) => {
            console.error("Snapshot error (favorites):", error.message);
            set({ favoritesLoading: false });
            toast.error("You don't have permission to access favorites.");
          }
        ); 
 
        return () => unsubscribeFavorites(); 
      } else { 
        set({  
          currentUser: null,  
          favorites: [], 
          favoritesLoading: false  
        }); 
      } 
    }); 
    
    // Set up products listener 
    const unsubscribeProducts = onSnapshot(collection(db, 'laptopCollection'), (snapshot) => { 
      const Laptops = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data(), 
        category: 'laptopCollection', 
      })); 
      set({ laptopsList: Laptops }); 
 
      const unsubscribeAccessories = onSnapshot( 
        collection(db, 'laptop-accessories'), 
        (snapshot) => { 
          const accessories = snapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data(), 
            category: 'laptop-accessories', 
          })); 
          set({ accessoriesList: accessories }); 
          const combinedProducts = [...Laptops, ...accessories]; 
          set({ products: combinedProducts }); 
 
          // Update cart with new products 
          const { cartItem } = get(); 
          const initialCart = { ...cartItem }; 
          combinedProducts.forEach((item) => { 
            if (!(item.id in initialCart)) { 
              initialCart[item.id] = 0; 
            } 
          }); 
          get().setCartItem(initialCart); 
          get().updateCartDetails(); 
        } 
      ); 
 
      return () => unsubscribeAccessories(); 
    }); 
 
    // Set up trending products 
    const fetchTrendingProducts = async () => { 
      const { favorites } = get(); 
      if (favorites.length > 0) return; 
 
      try { 
        let trendingProducts = []; 
        for (const collectionName of collections) { 
          const trendingQuery = query( 
            collection(db, collectionName), 
            where("isTrending", "==", true) 
          ); 
 
          const snapshot = await getDocs(trendingQuery); 
          const products = snapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data(), 
          })); 
 
          trendingProducts = [...trendingProducts, ...products]; 
        } 
 
        set({ trending: trendingProducts.filter((product) => product !== null) }); 
      } catch (error) { 
        console.error("Error fetching trending products:", error); 
        toast.error("Failed to fetch trending products"); 
      } 
    }; 
 
    // Update cart products and subtotal when cart or products change 
    const updateCartDetails = () => { 
      const { cartItem, products } = get(); 
      const productsInCart = products 
        .filter((product) => cartItem[product.id] > 0) 
        .map(product => ({ 
          ...product, 
          quantity: cartItem[product.id] 
        })); 
 
      const total = products.reduce((sum, product) => { 
        const quantity = cartItem[product.id] || 0; 
        return sum + product.price * quantity; 
      }, 0); 
 
      set({ cartProducts: productsInCart, subtotal: total }); 
    }; 
 
    // Set up listeners 
    fetchTrendingProducts(); 
    updateCartDetails(); 
     
    // Return cleanup function 
    return () => { 
      unsubscribeAuth(); 
      unsubscribeProducts(); 
    }; 
  }, 
 
  // Initialize cart from localStorage 
  initializeCart: () => { 
    const savedCart = localStorage.getItem('cartItems'); 
    if (savedCart) { 
      const parsedCart = JSON.parse(savedCart); 
      set({ cartItem: parsedCart }); 
      // Update cart count immediately 
      const count = Object.values(parsedCart).filter(value => value > 0).length; 
      set({ cartItemCount: count }); 
    } 
  }, 
 
})); 
 
// Subscribe to cart changes 
useShopStore.subscribe( 
  (state) => [state.cartItem, state.products], 
  () => { 
    const cartItem = useShopStore.getState().cartItem; 
    const count = Object.values(cartItem).filter(value => value > 0).length; 
    useShopStore.setState({ cartItemCount: count }); 
 
    useShopStore.getState().updateCartDetails(); 
  } 
); 
 
 
export default useShopStore;