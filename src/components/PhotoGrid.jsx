import React from 'react';
import PhotoCard from './PhotoCard';

export const PhotoGrid = ({
  photos,
  favorites,
  onToggleFavorite,
  searchQuery,
  onClearSearch,
}) => {
  // Empty state when search yields no matches
  if (photos.length === 0) {
    return (
      <div className="py-16 px-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">No photos found.</h2>
        <p className="text-sm text-gray-500 mb-4">
          No matches for &ldquo;{searchQuery}&rdquo;. Try searching for a different author.
        </p>
        {onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    // Responsive grid: 1 column on mobile, 2 columns on tablet, 4 columns on desktop
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavorite={favorites.includes(photo.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
