'use client';

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function SearchForMobile() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  const db = getFirestore();

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    searchProducts(value);
  };

  // Advanced search for products
  const searchProducts = async (term) => {
    if (!term) {
      setSearchResults([]);
      return;
    }

    const lowerCaseTerm = term.toLowerCase(); // Convert to lowercase for case-insensitive search
    const collectionsToSearch = ["laptop-accessories", "laptopCollection"];
    let results = [];

    for (const col of collectionsToSearch) {
      const collectionRef = collection(db, col);
      const snapshot = await getDocs(collectionRef);

      snapshot.forEach((doc) => {
        const data = doc.data();
        // Combine searchable fields into one string and convert to lowercase
        const searchableContent = `
          ${data.name || ""} 
          ${data.description || ""} 
          ${data.category || ""} 
          ${data.brand || ""} 
          ${data.cpu || ""} 
          ${data.ram || ""}`.toLowerCase();

        // Check if the term exists in the combined string
        if (searchableContent.includes(lowerCaseTerm)) {
          results.push({ 
            id: doc.id, 
            ...data, 
            collection: col 
          });
        }
      });
    }

    setSearchResults(results);
  };

  return (
    <div className="sm:hidden w-full mx-1">
      {/* Search Icon Button */}
      <button
        onClick={handleSearchToggle}
        className="py-2 px-2 bg-gray-100 rounded-full flex items-center justify-between w-full"
      >
        <span className="text-xs">search...</span>
        <Search className="w-4 h-4 text-gray-700" />
      </button>

      {/* Expandable Search Input */}
      {isSearchVisible && (
        <div className="absolute left-0 top-12 mt-2 w-screen bg-white shadow-lg animate-slideDown max-h-96 overflow-y-auto">
          <div className="flex items-center p-3 border-b">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 py-2 focus:outline-none"
            />
            <button
              onClick={() => {
                setSearchTerm("");
                setIsSearchVisible(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search Results */}
          <div className="flex-1 ">
            {searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  router.push(`/products/${product.collection}/${product.id}`);
                  // onClose();
                }}
                className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
              >
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  ${product.price} 
                  {product.brand && ` • Brand: ${product.brand}`}
                  {product.cpu && ` • CPU: ${product.cpu}`}
                  {product.ram && ` • RAM: ${product.ram}`}
                </p>
              </div>
            ))}
            {searchTerm && searchResults.length === 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                No products found for {searchTerm}
              </div>
            )}
          </div>


          {/* Quick Suggestions */}
          {searchTerm && (
            <div className="max-h-[60vh] overflow-y-auto divide-y">
              {/* Recent Searches */}
              <div className="p-3 bg-gray-50">
                <p className="text-xs text-gray-500 mb-2">Recent Searches</p>
                <div className="space-y-2">
                  {['Laptop', 'Mouse', 'Keyboard'].map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(term)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Popular Categories */}
          <div className="p-3">
            <p className="text-xs text-gray-500 mb-2">Popular Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {['Laptops', 'Accessories',].map((category, index) => (
                <button
                  key={index}
                  onClick={() => {router.push(`/${category}`); setIsSearchVisible(!isSearchVisible);}}
                  className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
