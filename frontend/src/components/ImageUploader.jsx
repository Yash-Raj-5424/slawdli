import { useState } from 'react';

const ImageUploader = ({ onFileChange, onSubmit, selectedFile, previewUrl, loading, error }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-2">
          Choose an image:
        </label>
        <div className="flex flex-col items-start">
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-500">
              Selected file: {selectedFile.name}
            </p>
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !selectedFile}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md disabled:opacity-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Image'
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default ImageUploader;
