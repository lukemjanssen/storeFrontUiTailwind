import React from "react";

export default function SearchBox({ label, placeholder, value, onChange }) {
    return (
        <div className="flex items-center gap-4">
            {/* Label */}
            {label && (
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {label}
                </label>
            )}

            {/* Search Input */}
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                />
                
                {/* Search Icon */}
                <svg 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                </svg>
            </div>
        </div>
    );
}