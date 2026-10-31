# Photo Gallery Web App — Celebrare Frontend Internship Assignment

A simple, responsive Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS**. It fetches 30 photos from the Picsum Photos API, supports instant real-time author search, and lets users favourite photos with persistence using React's `useReducer` and browser `localStorage`.

---

## Tech Stack

- **React** (Functional components & hooks)
- **Vite** (Build tool and dev server)
- **JavaScript (ES6+)**
- **Tailwind CSS** (Styling and responsive layout)
- **Browser localStorage** (Favourites persistence)
- **Fetch API** (Data fetching)

*(No TypeScript, Redux, or external UI component libraries were used, strictly following the assignment guidelines.)*

---

## Features

1. **30 Photos on Load**: Automatically fetches 30 photos from the Picsum API (`https://picsum.photos/v2/list?limit=30`).
2. **Responsive Grid Layout**:
   - Desktop (≥ 1024px): 4 columns
   - Tablet (768px – 1023px): 2 columns
   - Mobile (< 768px): 1 column
3. **Real-Time Author Search**:
   - Filter photos instantly by author name as you type.
   - Case-insensitive search without extra API calls or page reloads.
   - Displays "No photos found." when no authors match.
4. **Favourites with `useReducer`**:
   - Toggles favourites with the heart icon on each photo card.
   - Managed completely using `useReducer` (no `useState` for favourites).
   - Saved in `localStorage` so favourites stay intact after refreshing the page.
5. **Loading & Error Handling**:
   - Shows a clean spinner with "Loading photos..." while data is loading.
   - Shows a helpful error message with a "Try Again" retry button if the network request fails.

---

## Project Structure

```text
src/
├── components/
│   ├── Header.jsx          # Header with title, subtitle, and photo/favourite counters
│   ├── SearchBar.jsx       # Search input with search icon and clear button
│   ├── PhotoCard.jsx       # Individual card with photo, author name, and heart button
│   ├── PhotoGrid.jsx       # Responsive grid container and empty search state
│   ├── LoadingSpinner.jsx  # Centered loading spinner ("Loading photos...")
│   └── ErrorMessage.jsx    # Error state with retry button
├── hooks/
│   └── useFetchPhotos.js   # Custom hook returning { photos, loading, error, refetch }
├── reducers/
│   └── favoritesReducer.js # Reducer handling TOGGLE_FAVORITE and localStorage
├── App.jsx                 # Main application component
├── main.jsx                # React root mount
└── index.css               # Tailwind CSS directives
```

---

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Steps
1. Open the project directory in your terminal:
   ```bash
   cd d:/PHOTOBOOTH
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit:
   ```
   http://localhost:5173/
   ```

To build for production:
```bash
npm run build
```

---

## Explanation of Key React Concepts

### 1. `useReducer` for Favourites (`src/reducers/favoritesReducer.js`)
Instead of using `useState`, the favourites list is handled with `useReducer`. This keeps the state transition logic separate from the UI components:
- `TOGGLE_FAVORITE`: Checks if a photo ID already exists in the state array. If it's already there, it removes it (`filter`). If not, it appends it. It also saves the updated array into `localStorage` so it persists across reloads.
- `LOAD_FAVORITES`: Replaces the current list with an array of saved IDs (useful if restoring from storage).
- `getInitialFavorites()` reads `localStorage` when the app first starts so the saved favourites appear immediately without any delay.

### 2. Custom Hook: `useFetchPhotos` (`src/hooks/useFetchPhotos.js`)
This custom hook handles the Picsum API call and manages:
- `photos`: The list of 30 photo objects.
- `loading`: Boolean indicating whether the fetch is currently in progress.
- `error`: Error message string if the fetch fails or if `response.ok` is false.
- `refetch`: Function to re-run the fetch when clicking "Try Again".

By using this hook, `App.jsx` stays clean and doesn't have to deal with raw fetch logic or HTTP status checks.

### 3. `useCallback` for the Search Handler (`src/App.jsx`)
In React, functions defined inside components are recreated on every render.
By wrapping `handleSearchChange` in `useCallback`:
```javascript
const handleSearchChange = useCallback((e) => {
  setSearchQuery(e.target.value);
}, []);
```
React preserves the function reference between renders. Because `SearchBar` is wrapped in `React.memo`, this prevents `SearchBar` from re-rendering unnecessarily whenever the user marks a photo as favourite.

### 4. `useMemo` for Filtering Photos (`src/App.jsx`)
Filtering an array of 30 items on every render is unnecessary if the query and photo list haven't changed.
`useMemo` caches the filtered array:
```javascript
const filteredPhotos = useMemo(() => {
  if (!searchQuery.trim()) return photos;
  const query = searchQuery.toLowerCase().trim();
  return photos.filter((photo) =>
    photo.author.toLowerCase().includes(query)
  );
}, [photos, searchQuery]);
```
This calculation only re-runs when `photos` or `searchQuery` changes, keeping the app fast and responsive.

---

## 5-Minute Video Recording Guide

When preparing the mandatory screen recording:

1. **0:00 - 0:45 | Intro & Tech Stack**:
   - Introduce yourself and mention the assignment.
   - Mention the pure stack: React, Vite, Tailwind CSS, JavaScript ES6+, localStorage, and Fetch API.
2. **0:45 - 1:30 | Initial Load & useFetchPhotos**:
   - Refresh the page to show the "Loading photos..." spinner.
   - Show the 30 loaded photos.
   - Briefly show `src/hooks/useFetchPhotos.js` and explain how it separates API fetching from the UI.
3. **1:30 - 2:30 | Responsive Layout & Card Design**:
   - Show the clean photo cards with author names and heart buttons.
   - Open browser DevTools and resize the window to demonstrate:
     - 4 columns on Desktop
     - 2 columns on Tablet (768px)
     - 1 column on Mobile (375px)
4. **2:30 - 3:30 | Real-Time Search (`useCallback` & `useMemo`)**:
   - Type in an author name (e.g. "Alejandro") to demonstrate instant, case-insensitive search.
   - Type "xyz" to demonstrate the "No photos found." state, then click "Clear Search".
   - Explain how `useCallback` keeps the search handler reference stable and `useMemo` caches the filtered list.
5. **3:30 - 4:30 | Favourites with `useReducer` & LocalStorage**:
   - Click the heart on 2 or 3 cards to show the red filled heart and counter updating.
   - Open DevTools -> Application -> Local Storage to show the stored IDs.
   - Refresh the page to show that favourites remain saved.
   - Briefly show `src/reducers/favoritesReducer.js` and explain the `TOGGLE_FAVORITE` action.
6. **4:30 - 5:00 | Conclusion**:
   - Summarize the clean structure and wrap up.
