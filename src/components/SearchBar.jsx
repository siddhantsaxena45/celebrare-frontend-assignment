import React, { memo } from 'react';

// Memoized search bar to avoid re-renders when other parent state changes
export const SearchBar = memo(({ value, onChange, onClear }) => {
  return (
    <div className="w-full max-w-lg mx-auto px-4 mb-8">
      <div className="relative">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search photos by author..."
          className="w-full pl-10 pr-10 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-xl border border-gray-200 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
