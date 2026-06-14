const PredictionResult = ({ predictionResult }) => {
  if (!predictionResult) {
    return null;
  }

  return (
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"></path>
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
  );
};

export default PredictionResult;
