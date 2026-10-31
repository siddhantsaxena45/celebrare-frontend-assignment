export const FAVORITES_STORAGE_KEY = 'photo_gallery_favorites';

export const FAVORITES_ACTIONS = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  LOAD_FAVORITES: 'LOAD_FAVORITES',
};

// Helper to load saved favorites from localStorage on initial render
export const getInitialFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to read favorites from localStorage:', error);
    return [];
  }
};

// Reducer function to manage favorite photo IDs
export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITES_ACTIONS.TOGGLE_FAVORITE: {
      const photoId = action.payload;
      const isFavorited = state.includes(photoId);

      // If already favorited, remove it; otherwise, add it
      const updated = isFavorited
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];

      // Keep localStorage in sync
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
      }

      return updated;
    }

    case FAVORITES_ACTIONS.LOAD_FAVORITES:
      return Array.isArray(action.payload) ? action.payload : [];

    default:
      return state;
  }
}
