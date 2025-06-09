import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PromoSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative w-full h-64">
            <Image
              src="/images/promo-banner.avif"
              alt="Special Promotion"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-600/40 flex items-center">
            <div className="max-w-xl ml-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Upgrade Your Workspace
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Transform your setup with our premium collection of accessories
              </p>
              <Link
                href="/Accessories"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}