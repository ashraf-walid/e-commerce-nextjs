import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import components with loading states
const HeroBanner = dynamic(() => import('@/components/home/HeroBanner'), {
  loading: () => <div className="h-[600px] bg-gray-100 animate-pulse" />
});

const CategorySection = dynamic(() => import('@/components/home/CategorySection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const PromoSection = dynamic(() => import('@/components/home/PromoSection'), {
  loading: () => <div className="h-64 bg-white animate-pulse" />
});

const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const Footer = dynamic(() => import('@/components/footer/Footer'), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />
});

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-[600px] bg-gray-100 animate-pulse" />}>
        <HeroBanner />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <CategorySection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <FeaturedProducts />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-white animate-pulse" />}>
        <PromoSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
