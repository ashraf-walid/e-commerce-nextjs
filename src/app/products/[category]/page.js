'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Monitor, Mouse, Keyboard, Headphones, Laptop } from 'lucide-react';
import useShopStore from '@/store/shopStore';
import AccessoryCard from '@/components/accessoryPage/AccessoryCard';
import FilterSidebar from '@/components/accessoryPage/AccessoryFilterSidebar';
import SearchBar from '@/components/accessoryPage/AccessorySearchBar';
import { categories, brands } from '@/constant/constants';

const categoryIcons = {
  'laptopCollection': Laptop,
  'laptop-accessories': Monitor
};

const categoryTitles = {
  'laptopCollection': 'Laptops',
  'laptop-accessories': 'Laptop Accessories'
};

export default function ProductListing() {
  const params = useParams();
  const category = params.category;
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: null,
    brand: null,
    maxPrice: 1000
  });

  const { products, loading, error } = useShopStore();
  const Icon = categoryIcons[category] || Monitor;

  // Filter products based on category, search and filters
  const filteredProducts = products.filter(product => {
    const matchesCategory = product.category === category;
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = !filters.brand || 
      product.brand === filters.brand;

    const matchesPrice = product.price <= filters.maxPrice;

    return matchesCategory && matchesSearch && matchesBrand && matchesPrice;
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Products</h2>
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
            {categoryTitles[category]}
          </h1>
          <div className="flex items-center gap-2">
            <Icon className="w-8 h-8 text-blue-500" />
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
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <AccessoryCard key={product.id} accessory={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 