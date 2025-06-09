'use client';

import { AlertCircle } from 'lucide-react';

export default function CartError({ message }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-red-100 rounded-full p-3 mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Cart</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}