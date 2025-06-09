'use client';

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function SearchBar({ isOpen, onOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();
  const db = getFirestore();

  // Focus the input when the search bar opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

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

  // Handle search term changes
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    searchProducts(value);
  };
  
  return (
    <div className="relative">
      {/* Search Icon */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 p-3 rounded-full shadow-lg text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 max-sm:hidden"
        >
          <Search className="w-6 h-6" />
        </button>
      )}

      {/* Search Box */}
      {isOpen && (
        <>
          <div className="animate-slide-left z-50 fixed top-0 right-0 w-80 h-full bg-white p-5 shadow-md border-l border-gray-300 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Search Products</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative mb-4">
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                type="text"
                placeholder="Type to search..."
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    router.push(`/products/${product.collection}/${product.id}`);
                    onClose();
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

            {/* Close Button */}
            <button
              className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onClose}
            >
              Close Search
            </button>
          </div>

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
        </>
      )}
    </div>
  );
}
