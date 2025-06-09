'use client';

import { useState } from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import useShopStore from '@/store/shopStore';
import useAuth from '@/lib/useAuth'; 
import Image from "next/image";

export default function Favorites() {
  const { authLoading } = useAuth(); 
  const [isHovered, setIsHovered] = useState(false);
  const {
    addToCart,
    favorites,
    toggleFavorite,
    trending,
    favoritesLoading,
  } = useShopStore();
  const [showAddedFeedback, setShowAddedFeedback] = useState({});

  const handleAddToCart = (productId) => {
    addToCart(productId);
    setShowAddedFeedback(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setShowAddedFeedback(prev => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  if (authLoading || favoritesLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Heart className="w-12 h-12 text-blue-500 animate-pulse" />
        <p className="mt-4 text-gray-600 font-medium">Loading your favorites...</p>
      </div>
    );
  }

  if (!favorites.length && trending.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse" />
          <Heart className="relative z-10 w-16 h-16 text-blue-500" aria-label="Empty favorites icon" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Your Favorites List is Empty
        </h2>
        <p className="text-gray-600 text-lg mb-2 text-center max-w-md">
          You haven&apos;t added any products to your favorites list yet.
        </p>
        <p className="text-gray-500 text-base mb-6 text-center max-w-md">
          Browse our products and click on the heart icon to save your favorite items!
        </p>
        <Link
          href="/Laptops"
          className="group bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:-translate-y-1"
        >
          <span className="flex items-center gap-2">
            Browse Products
            <Package className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </span>
        </Link>
      </div>
    );
  }

  const renderProductCard = (product, isFavorite = false) => (
    <div
      key={isFavorite ? product.favId : product.id}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <Link href={`/products/${product.collection}/${product.productId}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name || "Product image"}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-t-xl"
            loading="lazy"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/5 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm text-white bg-black/50 px-2 py-1 rounded">View Details</span>
            </div>
          )}
        </Link>
        {product.price && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            £ {product.price}
          </span>
        )}
        {isFavorite && (
          <div className="absolute top-2 left-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" aria-label="Favorite icon" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name || "Unnamed Product"}
        </h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => handleAddToCart(product.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              showAddedFeedback[product.id]
                ? 'bg-green-50 text-green-600'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {showAddedFeedback[product.id] ? 'Added' : 'add to cart'}
          </button>

          {isFavorite && (
            <button
              onClick={() => toggleFavorite(product.id)}
              className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
              title="Remove from Favorites"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Favorites</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover your saved favorite products. You can add them to your cart or remove them from your favorites anytime.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm">
              <Heart className="w-6 h-6 text-red-500" aria-label="Favorites section icon" />
              <h2 className="text-2xl font-bold text-gray-900">Your Favorite Products ({favorites.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map(product => renderProductCard(product, true))}
            </div>
          </div>
        )}

        {!favorites.length && trending.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm">
              <TrendingUp className="w-6 h-6 text-blue-500" aria-label="Trending section icon" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Trending Products</h2>
                <p className="text-gray-600 mt-1">
                  While your favorites list is empty, explore trending products loved by our customers.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.map(product => renderProductCard(product))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

