import { API_BASE_URL } from '../utils/constants';

export async function predictImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const url = `${API_BASE_URL}/api/v1/predict`;

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
  } catch {
    throw new Error('Unable to reach the analysis server. Check your connection and try again.');
  }

  if (!response.ok) {
    let message = 'Analysis failed. Please try again.';
    try {
      const data = await response.json();
      if (data.detail) {
        message = typeof data.detail === 'string' ? data.detail : message;
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return response.json();
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === 'healthy';
  } catch {
    return false;
  }
}
