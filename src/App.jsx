import React, { useState, useReducer, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PhotoGrid from './components/PhotoGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import useFetchPhotos from './hooks/useFetchPhotos';
import {
  favoritesReducer,
  getInitialFavorites,
  FAVORITES_ACTIONS,
} from './reducers/favoritesReducer';

export function App() {
  const { photos, loading, error, refetch } = useFetchPhotos();
  const [searchQuery, setSearchQuery] = useState('');

  // Favorites state managed via useReducer, initialized from localStorage
  const [favorites, dispatchFavorites] = useReducer(
    favoritesReducer,
    [],
    getInitialFavorites
  );

  // Memoized search input handler to avoid unnecessary re-renders
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Toggle favorite photo by ID
  const handleToggleFavorite = useCallback((photoId) => {
    dispatchFavorites({
      type: FAVORITES_ACTIONS.TOGGLE_FAVORITE,
      payload: photoId,
    });
  }, []);

  // Filter photos in real-time by author name
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) {
      return photos;
    }
    const query = searchQuery.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div className="w-full">
        <Header
          favoritesCount={favorites.length}
          totalCount={photos.length}
        />

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />

        <main className="w-full">
          {loading && <LoadingSpinner />}

          {!loading && error && (
            <ErrorMessage message={error} onRetry={refetch} />
          )}

          {!loading && !error && (
            <PhotoGrid
              photos={filteredPhotos}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
            />
          )}
        </main>
      </div>

      <footer className="py-6 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>Celebrare Frontend Internship Assignment &bull; Built with React &amp; Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
