'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import NotFound from '@/app/not-found';
import ProductDetails from '@/app/ProductDetails/page';

const productTypeMap = {
  'laptopCollection': 'laptop',
  'laptop-accessories': 'accessory'
};

export default function ProductRouter() {
  const params = useParams();
  const category = params.category;
  const id = params.id;
  
  const productType = productTypeMap[category];

  if (!productType) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ProductDetails productType={productType} productId={id} />
    </Suspense>
  );
} 