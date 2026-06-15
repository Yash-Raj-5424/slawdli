const PredictionResult = ({ predictionResult }) => {
  if (!predictionResult) {
    return null;
  }

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center space-x-3">
        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-.165-.004-.33-.011-.49z"></path>
        </svg>
        Prediction Result
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-.165-.004-.33-.011-.49z"></path>
            </svg>
          </span>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Prediction:</p>
            <p className="text-2xl font-bold text-gray-900">{predictionResult.prediction}</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"></path>
            </svg>
          </span>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Confidence:</p>
            <p className="text-2xl font-bold text-gray-900">
              {(predictionResult.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {predictionResult.all_predictions && (
          <>
            <div className="mt-5">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center space-x-2">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a2 2 0 100-4m0 4a2 2 0 110-4m0 6a2 2 0 100-4m0 4a2 2 0 110-4m0 6a2 2 0 100-4"></path>
                </svg>
                All Predictions:
              </h3>
              <div className="space-y-2">
                {Object.entries(predictionResult.all_predictions).map(
                  ([label, confidence]) => (
                    <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {label.substring(0, 1).toUpperCase()}
                        </span>
                        <p className="text-sm font-medium text-gray-700">{label}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {(confidence * 100).toFixed(1)}%
                        </p>
                        <div className="w-full h-1 mt-1 bg-gray-200 rounded-full">
                          <div
                            className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                            style={{ width: `${confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PredictionResult;