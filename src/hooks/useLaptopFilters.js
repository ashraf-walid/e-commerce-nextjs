import { useState, useMemo } from 'react';

export function useLaptopFilters(products) {
    // Get initial price range from products
    const initialPriceRange = useMemo(() => {
        if (!products.length) return { min: 0, max: 10000 };
        return {
            min: Math.min(...products.map(p => p.price)),
            max: Math.max(...products.map(p => p.price))
        };
    }, [products]);

    const [filters, setFilters] = useState({
        brands: [],
        processors: [],
        ram: [],
        storage: [],
        minPrice: initialPriceRange.min,
        maxPrice: initialPriceRange.max,
        sortBy: 'featured'
    });

    // Get available options for each filter => brand, cpu, ram, storage
    const availableOptions = useMemo(() => ({
        brands: [...new Set(products.map(p => p.brand))].sort(), // Set => Remove duplicates
        processors: [...new Set(products.map(p => p.cpu))].sort(),
        ram: [...new Set(products.map(p => p.ram))].sort(),
        storage: [...new Set(products.map(p => p.storage))].sort()
    }), [products]);

    // Sort and filter products
    const filteredAndSortedLaptops = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesBrand = filters.brands.length === 0 || 
                filters.brands.includes(product.brand);
            
            const matchesProcessor = filters.processors.length === 0 || 
                filters.processors.includes(product.cpu);
            
            const matchesRam = filters.ram.length === 0 || 
                filters.ram.includes(product.ram);
            
            const matchesStorage = filters.storage.length === 0 || 
                filters.storage.includes(product.storage);
            
            const matchesPrice = product.price >= filters.minPrice && 
                product.price <= filters.maxPrice;

            // All conditions must be met for the product to be accepted.
            return matchesBrand && matchesProcessor && matchesRam && 
                matchesStorage && matchesPrice;
        });

        // Sort the filtered results
        // Sort filtered products based on specified sorting criteria.
        switch (filters.sortBy) {
            // Prices are arranged in ascending order (lowest price comes first).
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default: // 'featured'
                // Keep original order
                break;
        }

        return filtered;
    }, [products, filters]);

    return {
        filters,
        setFilters,
        filteredLaptops: filteredAndSortedLaptops,
        availableOptions,
        priceRange: initialPriceRange,
        resultsCount: filteredAndSortedLaptops.length,
        totalCount: products.length
    };
}









// const STORAGE_KEY = 'laptop-filters';

    // Get saved filters from localStorage
    // const getSavedFilters = () => {
    //     const saved = localStorage.getItem(STORAGE_KEY);
    //     if (saved) {
    //         const parsed = JSON.parse(saved);
    //         return {
    //             ...parsed,
    //             minPrice: parsed.minPrice || initialPriceRange.min,
    //             maxPrice: parsed.maxPrice || initialPriceRange.max
    //         };
    //     }
    //     return {
    //         brands: [],
    //         processors: [],
    //         ram: [],
    //         storage: [],
    //         minPrice: initialPriceRange.min,
    //         maxPrice: initialPriceRange.max,
    //         sortBy: 'featured'
    //     };
    // };


        // Save filters to localStorage when they change
    // useEffect(() => {
    //     localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    // }, [filters]);