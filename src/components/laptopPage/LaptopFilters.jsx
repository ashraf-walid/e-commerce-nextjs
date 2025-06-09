import { Slider } from "../UI/ui-Slider";
import { FilterSection } from "./FilterSection";
import { SortOptions } from "./SortOptions";
import { FilterStats } from "./FilterStats";
import { RefreshCcw, Tags, Cpu, MemoryStick, HardDrive } from "lucide-react";

import { useMemo, useState, useEffect } from "react";
import { useDebounce } from '@/hooks/useDebounce';

export function LaptopFilters({
    filters, // { brands: [], processors: [], ram: [], storage: [], minPrice: initialPriceRange.min, maxPrice: initialPriceRange.max, sortBy: 'featured'}
    setFilters,
    availableOptions, // available options for each filter => { brands: [.....] , processors: [.....], ram: [.....], storage: [.....], }
    priceRange,
    resultsCount,
    totalCount,
}) {

    const [sliderValue, setSliderValue] = useState([filters.minPrice, filters.maxPrice]);

    const handleSliderChange = ([min, max]) => {
        setSliderValue([min, max]);
    };

    const debouncedFilterChange = useDebounce((min, max) => {
        setFilters((prev) => ({
            ...prev,
            minPrice: min,
            maxPrice: max,
        }));
    }, 400); // 400ms delay

    useEffect(() => {
        debouncedFilterChange(sliderValue[0], sliderValue[1]);
    }, [sliderValue, debouncedFilterChange]);

    // filterType => "sortBy"
    // value => "featured" or "price-asc" or brands or ........
    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-200">

            {/* Header */}
            <div className="mb-4 border-b pb-4">
                {/* Title and Product Count */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Filter Results
                    </h2>
                    <p className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-md shadow-sm mb-2">
                        {totalCount} Products
                    </p>

                {/* Filter Stats */}
                <div className="md:mt-0 flex items-center gap-2">
                    <FilterStats
                        resultsCount={resultsCount}
                        totalCount={totalCount}
                    />
                </div>
            </div>


            {/* Sort Options */}
            <SortOptions
                value={filters.sortBy}
                onChange={(value) => handleFilterChange("sortBy", value)}
            />

            {/* Price Slider */}
            <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Price Range
                </h3>

                <Slider
                    min={priceRange.min}
                    max={priceRange.max}
                    value={sliderValue} 
                    onChange={handleSliderChange} 
                />

                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>£ {sliderValue[0]}</span>
                        <span>£ {sliderValue[1]}</span>
                    </div>
            </div>

            {/* Filter Sections */}
            {[
                { name: "Brands", key: "brands", icon: <Tags className="w-4 h-4" /> },
                { name: "Processors", key: "processors", icon: <Cpu className="w-4 h-4" /> },
                { name: "RAM", key: "ram", icon: <MemoryStick className="w-4 h-4" /> },
                { name: "Storage", key: "storage", icon: <HardDrive className="w-4 h-4" /> },
            ].map((section) => (
                <FilterSection
                    key={section.key}
                    title={
                        <div className="flex items-center">
                            {section.icon}
                            <span className="ml-2">{section.name}</span>
                        </div>
                    }
                    // options = {[Dell, HP], [i3, ....], [8GB, .... ], [128GB, ....],}
                    options={availableOptions[section.key]}
                    selected={filters[section.key]}
                    onChange={(value) => handleFilterChange(section.key, value)}
                />
            ))}

            {/* Reset Button */}
            <button
                onClick={() =>
                    setFilters({
                        brands: [],
                        processors: [],
                        ram: [],
                        storage: [],
                        minPrice: priceRange.min,
                        maxPrice: priceRange.max,
                        sortBy: "featured",
                    })
                }
                className="mt-6 w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200"
            >
                <RefreshCcw className="w-4 h-4" />
                Reset Filters
            </button>
        </div>
    );
}
