export function formatLabel(label) {
  if (!label) return '';
  return label
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatConfidence(value) {
  return `${Math.round(value * 100)}%`;
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function sortPredictions(allPredictions) {
  if (!allPredictions) return [];
  return Object.entries(allPredictions)
    .sort(([, a], [, b]) => b - a)
    .map(([label, confidence]) => ({ label, confidence }));
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function validateImageFile(file) {
  if (!file) return 'Please select an image file.';
  if (!file.type.startsWith('image/')) return 'File must be an image (JPEG, PNG, or WebP).';
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return 'Supported formats: JPEG, PNG, and WebP.';
  }
  if (file.size > 10 * 1024 * 1024) return 'Image must be smaller than 10 MB.';
  return null;
}
