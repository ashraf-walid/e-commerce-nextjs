'use client';

export default function CartLoading() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        <p className="mt-4 text-gray-600 font-medium">Loading your cart...</p>
      </div>
    );
  }