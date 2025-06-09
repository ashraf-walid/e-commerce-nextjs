'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";
import useShopStore from '@/store/shopStore';

export default function AccessoryCard({ accessory }) {
  const mainImage = accessory.images?.[0] || accessory.image;
  const addToCart = useShopStore(state => state.addToCart);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
      <div className="relative">
        <Link href={`/products/laptop-accessories/${accessory.id}`}>
          <div className="w-full h-48 relative">
            {/* عنصر تحميل رمادي قبل تحميل الصورة */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            {mainImage && (
              <Image 
                src={mainImage}
                alt={accessory.name}
                width={300}
                height={200}
                className={`w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300 rounded-t-xl ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            )}
          </div>
        </Link>

        {/* خصم السعر */}
        <div className="absolute top-2 right-2">
          {accessory.discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              -{accessory.discount}%
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{accessory.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{accessory.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">£ {accessory.price}</span>
            {accessory.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {accessory.originalPrice} 
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(accessory.id)}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 text-xs">
            <div>
              <span className="text-gray-500">Brand:</span>
              <span className="ml-1 text-gray-700">{accessory.brand}</span>
            </div>
            {accessory.warranty && (
              <div>
                <span className="text-gray-500">Warranty:</span>
                <span className="ml-1 text-gray-700">{accessory.warranty}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
