'use client';

import { Star, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, } from "firebase/firestore";
import useShopStore from '@/store/shopStore';
import Link from 'next/link';
import Image from 'next/image';

const collections = ["laptopCollection", "laptop-accessories"];

const ExperimentalData = [
  { rating: 4.8, reviews: 456 },
  { rating: 4.9, reviews: 389 },
  { rating: 4.7, reviews: 567 },
];

export default function FeaturedProducts() {
  const { addToCart } = useShopStore();
  const [ featuredProducts, setFeaturedProducts] = useState([]);

      useEffect(() => {
      const fetchFeaturedProducts = async () => {
        try {
        let FeaturedProducts = [];
        for (const collectionName of collections) {
            const featuredQuery = query(
            collection(db, collectionName),
            where("isFeatured", "==", true)
            );
          const snapshot = await getDocs(featuredQuery);

          FeaturedProducts = snapshot.docs.map((doc, index) => ({
            id: doc.id,
            ...doc.data(),
            ...ExperimentalData[index % ExperimentalData.length],
            collectionName: collectionName,
          }));
        }
        
        setFeaturedProducts(FeaturedProducts);
        } catch (error) {
          console.error("Error fetching trending products:", error);
          alert.error("Failed to fetch trending products");
        }
        };
  
          fetchFeaturedProducts();
      }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Featured Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative">
                <Link href={`/products/${product.collectionName}/${product.id}`}> 
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </Link>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-600">
                      {product.rating} 
                    </span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    {product.reviews}  reviews
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                  {product.price} <span className="text-xs text-gray-500">£</span>
                  </span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}