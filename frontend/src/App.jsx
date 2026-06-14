import { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPredictionResult(null);
      setError(null);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/v1/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPredictionResult(result);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Skin Disease Detection
          </h1>
          <p className="text-gray-600">
            Upload an image to get a prediction
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
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
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {predictionResult && (
          <div className="mt-6 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Prediction Result
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-.165-.004-.33-.011-.49z"></path>
                  </svg>
                </span>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Prediction:</p>
                  <p className="text-lg font-semibold text-gray-900">{predictionResult.prediction}</p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </span>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Confidence:</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {(predictionResult.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {predictionResult.all_predictions && (
                <>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      All Predictions:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {Object.entries(predictionResult.all_predictions).map(
                        ([label, confidence]) => (
                          <li key={label}>
                            {label}: {(confidence * 100).toFixed(1)}%
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
