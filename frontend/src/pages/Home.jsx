import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import PredictionResult from '../components/PredictionResult';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
    setPredictionResult(null);
    setError(null);
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 px-6 pt-16 pb-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Skin Disease Detection
        </h1>
        <p className="text-gray-600">
          Upload an image to get a prediction
        </p>
      </header>
      <ImageUploader
        selectedFile={selectedFile}
        previewUrl={previewUrl}
        loading={loading}
        error={error}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
      <PredictionResult predictionResult={predictionResult} />
    </div>
  );
};

export default Home;