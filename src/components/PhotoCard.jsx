import React, { memo } from 'react';

export const PhotoCard = memo(({ photo, isFavorite, onToggleFavorite }) => {
  // Use Picsum's formatted dimensions for fast, consistent rendering
  const imageUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 border border-gray-100 flex flex-col">
      {/* Photo with heart button */}
      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to original download_url if resized URL fails
            if (e.target.src !== photo.download_url) {
              e.target.src = photo.download_url;
            }
          }}
        />

        {/* Favorite heart button in top-right corner */}
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition"
        >
          {isFavorite ? (
            // Filled red heart
            <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            // Outlined white heart
            <svg className="w-5 h-5 text-white fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Author name below image */}
      <div className="p-3.5">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Author</p>
        <p className="text-sm font-semibold text-gray-800 truncate" title={photo.author}>
          {photo.author}
        </p>
      </div>
    </div>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
