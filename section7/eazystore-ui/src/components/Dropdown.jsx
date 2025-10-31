import { useState, useRef, useEffect } from 'react';

export default function Dropdown({ 
    label = "Select Option", 
    options = [], 
    value, 
    onChange,
    placeholder = "Choose an option...",
    className = ""
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`flex items-center gap-4 ${className}`} ref={dropdownRef}>
            {/* Label */}
            {label && (
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {label}
                </label>
            )}

            {/* Dropdown Container */}
            <div className="relative flex-1">
                {/* Dropdown Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                    <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    
                    {/* Arrow Icon */}
                    <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {options.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                No options available
                            </div>
                        ) : (
                            <ul className="py-1">
                                {options.map((option) => (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelect(option)}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                                                value === option.value
                                                    ? 'bg-blue-50 text-primary font-medium'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{option.label}</span>
                                                {value === option.value && (
                                                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}