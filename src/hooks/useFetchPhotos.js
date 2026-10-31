import { useState, useEffect, useCallback } from 'react';

// Custom hook to fetch 30 photos from Picsum API
export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial fetch on mount
  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadPhotos() {
      try {
        setError(null);
        const res = await fetch('https://picsum.photos/v2/list?limit=30', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Server returned status: ${res.status}`);
        }

        const data = await res.json();
        if (active) setPhotos(data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (active) setError(err.message || 'Failed to load photos.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPhotos();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  // Manual retry function for the error state
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://picsum.photos/v2/list?limit=30');
      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      setError(err.message || 'Failed to load photos.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { photos, loading, error, refetch };
};

export default useFetchPhotos;
