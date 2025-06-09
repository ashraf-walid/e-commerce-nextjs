'use client';

import { Star, ArrowUpDown, ArrowUp, ArrowDown, ArrowDownAZ, ArrowUpAZ } from "lucide-react";

export function SortOptions({ value, onChange }) {
    const options = [
        { label: "Featured", value: "featured", icon: <Star className="w-5 h-5" /> },
        { label: "Price: Low to High", value: "price-asc", icon: <ArrowUp className="w-5 h-5" /> },
        { label: "Price: High to Low", value: "price-desc", icon: <ArrowDown className="w-5 h-5" /> },
        { label: "Name: A to Z", value: "name-asc", icon: <ArrowDownAZ className="w-5 h-5" /> },
        { label: "Name: Z to A", value: "name-desc", icon: <ArrowUpAZ className="w-5 h-5" /> },
    ];

    return (
        <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Sort By</h3>
            <div className="flex flex-col gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ${
                            value === option.value 
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => onChange(option.value)}
                    >
                        <span className={value === option.value ? "text-yellow-400" : "text-gray-500"}>
                            {option.icon}
                        </span>
                        <span>{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
