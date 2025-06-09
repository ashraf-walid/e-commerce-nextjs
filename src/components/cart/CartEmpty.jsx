/* eslint-disable react/no-unescaped-entities */

'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowRight, Laptop, Headphones} from 'lucide-react';

const suggestedCategories = [
  { name: 'Laptops', path: '/Laptops', icon: Laptop },
  { name: 'Accessories', path: '/Accessories', icon: Headphones },
];

export default function CartEmpty() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      {/* Animation Container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full animate-pulse scale-110" />
        <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 rounded-full p-8">
          <ShoppingCart className="h-16 w-16 text-white animate-bounce" />
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Looks like you haven't added anything to your cart yet. 
          Browse our collections and find something you'll love!
        </p>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {suggestedCategories.map((category) => (
            <Link
              key={category.name}
              href={category.path}
              className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <category.icon className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 group"
        >
          Start Shopping
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}