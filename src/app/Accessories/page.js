'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Monitor, Mouse, Keyboard, Headphones } from 'lucide-react';
import AccessoryCard from '@/components/accessoryPage/AccessoryCard';
import FilterSidebar from '@/components/accessoryPage/AccessoryFilterSidebar';
import SearchBar from '@/components/accessoryPage/AccessorySearchBar';
import { categories, brands } from '@/constant/constants';
import { useAccessories } from '@/hooks/useAccessories';

export default function Accessories() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccessoriesContent />
    </Suspense>
  );
}

function AccessoriesContent() {
  const searchParams = useSearchParams();
  const categoryFromHomePage = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: categoryFromHomePage || null,
    brand: null,
    maxPrice: 1000
  });

  const { accessories, loading, error } = useAccessories(filters, searchQuery);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Accessories</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Laptop Accessories
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-8 max-sm:gap-4 max-sm:grid max-sm:grid-cols-2">
            {[
              { Icon: Mouse, label: 'Mouse' },
              { Icon: Keyboard, label: 'Keyboard' },
              { Icon: Monitor, label: 'Monitor' },
              { Icon: Headphones, label: 'Headphones' },
            ].map(({ Icon, label }, index) => (
              <div key={index} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              brands={brands}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading accessories...</p>
              </div>
            ) : accessories.length === 0 ? (
              <div className="text-center py-12">
                <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No accessories found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessories.map(accessory => (
                  <AccessoryCard key={accessory.id} accessory={accessory} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

