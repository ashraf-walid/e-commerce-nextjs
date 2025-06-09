'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { AccessoryFields, LaptopsFields } from '@/constant/constants';
import { ChevronRight, Home } from 'lucide-react';
import useShopStore from '@/store/shopStore';

import ImageGallery from '@/components/productDetail/ImageGallery';
import ProductInfo from '@/components/productDetail/ProductInfo';
import ProductActions from '@/components/productDetail/ProductActions';
import SpecificationTable from '@/components/productDetail/SpecificationTable';
import Footer from '@/components/footer/Footer';
import CheckoutModal from '@/components/checkout/CheckoutModal';
import SignInModal from '@/components/auth/SignInModal';

const COLLECTION_CONFIG = {
  laptop: {
    collection: 'laptopCollection',
    fields: LaptopsFields,
    title: 'Laptops',
    path: '/Laptops'
  },
  accessory: {
    collection: 'laptop-accessories',
    fields: AccessoryFields,
    title: 'Accessories',
    path: '/Accessories'
  }
};

export default function ProductDetails({ productType, productId }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const router = useRouter();
  
  const { 
    addToCart, 
    cartItem, 
    currentUser, 
    toggleFavorite, 
    favorites,
    isFavorite,
    signInWithGoogle,
  } = useShopStore();

  // Validate product type and redirect if invalid
  useEffect(() => {
    if (!productType || !COLLECTION_CONFIG[productType]) {
      toast.error("Invalid product type", { autoClose: 2500 });
      router.push('/');
      return;
    }
  }, [productType, router]);

  // Fetch product using id from URL
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        toast.error("Invalid product ID", { autoClose: 2500 });
        setIsLoading(false);
        router.push('/');
        return;
      }

      const config = COLLECTION_CONFIG[productType];
      if (!config) {
        toast.error("Invalid product type");
        setIsLoading(false);
        router.push('/');
        return;
      }

      try {
        setIsLoading(true);
        const docRef = doc(db, config.collection, productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error("Product not found", { autoClose: 2500 });
          router.push(config.path);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details. Please try again later.');
        router.push(COLLECTION_CONFIG[productType].path);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId, productType, router]);

  // Check if product is in favorites
  useEffect(() => {
    const checkFavoriteStatus = () => {
      if (product && favorites) {
        setIsFavoriteProduct(isFavorite(product.id));
      }
    };

    checkFavoriteStatus();
  }, [product, favorites, isFavorite]);

  // Toggle favorite handler
  const handleToggleFavorite = async () => {
    if (!currentUser) {
      setPendingAction('favorite');
      setShowSignInModal(true);
      return;
    }

    setIsProcessing(true);
    try {
      const result = await toggleFavorite(product.id);
      if (result !== null) {
        setIsFavoriteProduct(result);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      setPendingAction('buy');
      setShowSignInModal(true);
      return;
    }
    setIsBuying(true);
  };

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      setShowSignInModal(false);
      
      // Execute the pending action after successful sign in
      if (pendingAction === 'favorite') {
        handleToggleFavorite();
      } else if (pendingAction === 'buy') {
        handleBuyNow();
      } else if (pendingAction === 'cart') {
        handleAddToCart();
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Failed to sign in. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Product Not Found</h2>
            <p className="mt-2 text-gray-600">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link 
              href={COLLECTION_CONFIG[productType]?.path || '/'}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Return to {COLLECTION_CONFIG[productType]?.title || 'Home'}
            </Link>
          </div>
        </div>
      </>
    );
  }

  const fields = COLLECTION_CONFIG[productType].fields;
  const config = COLLECTION_CONFIG[productType];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <Home className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-5 w-5 text-gray-400" />
                <Link href={config.path} className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {config.title}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ImageGallery 
              images={product.images || []} 
              productName={product.name || 'Unknown'} 
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
              <ProductInfo
                name={product.name || 'Unknown'}
                description={product.description || 'No description available'}
                brand={product.brand || 'Unknown'}
                price={product.price || 0}
              />

              <div className="border-t border-gray-100 pt-6">
                <ProductActions
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onBuyNow={handleBuyNow}
                  cartItemCount={cartItem[product.id] || 0}
                  isFavorite={isFavoriteProduct}
                  isProcessing={isProcessing}
                  isInBuyingProcess={isBuying}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>
              <SpecificationTable
                specifications={fields
                  .filter(field => field.type !== 'checkbox')
                  .map(field => ({
                    name: field.name,
                    placeholder: field.placeholder,
                    value: product[field.name],
                  }))}
              />
            </div>
          </div>
        </div>
      </div>

      {isBuying && (
        <CheckoutModal
          onClose={() => setIsBuying(false)} 
          product={product}
        />
      )}

      <SignInModal
        isOpen={showSignInModal}
        onClose={() => {
          setShowSignInModal(false);
          setPendingAction(null);
        }}
        onSignIn={handleSignIn}
      />

      <Footer />
    </div>
  );
}
