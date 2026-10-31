import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-sm font-medium text-gray-500">Loading photos...</p>
    </div>
  );
};

export default LoadingSpinner;
