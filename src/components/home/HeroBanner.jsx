import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[600px]">
      <Image
        src="/images/hero-banner.jpg"
        alt="Hero Banner"
        fill
        priority
        className="object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Discover Premium Tech Accessories
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Enhance your digital lifestyle with our curated collection of high-quality accessories
          </p>
          <Link
            href="/Laptops"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}