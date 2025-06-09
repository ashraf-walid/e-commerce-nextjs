import { Sliders } from 'lucide-react';

export default function FilterSidebar({ filters, setFilters, categories, brands }) {
  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category: category === prev.category ? null : category
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      brand: brand === prev.brand ? null : brand
    }));
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({
      ...prev,
      maxPrice: parseInt(e.target.value)
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Sliders className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.brand === brand}
                onChange={() => handleBrandChange(brand)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Maximum Price</h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="100"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>£ 0</span>
          <span>£ {filters.maxPrice}</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => setFilters({
          category: null,
          brand: null,
          maxPrice: 1000
        })}
        className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}