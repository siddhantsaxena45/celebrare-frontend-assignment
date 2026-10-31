import React from 'react';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="py-20 px-4 max-w-sm mx-auto text-center">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
        !
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Failed to load photos</h2>
      <p className="text-sm text-gray-500 mb-5">
        {message || 'Something went wrong. Please check your connection.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
