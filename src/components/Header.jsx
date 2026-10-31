import React from 'react';

export const Header = ({ favoritesCount = 0, totalCount = 0 }) => {
  return (
    <header className="pt-10 pb-6 text-center px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
        Photo <span className="text-purple-600">Gallery</span>
      </h1>
      <p className="mt-2 text-base text-gray-500">
        Discover and save your favourite moments.
      </p>

      {totalCount > 0 && (
        <div className="mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-500">
          <span>{totalCount} photos</span>
          <span>•</span>
          <span className="text-purple-600 font-medium">
            {favoritesCount} {favoritesCount === 1 ? 'favourite' : 'favourites'}
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
