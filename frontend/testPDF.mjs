import { generateReportPDF } from './src/utils/generateReportPDF.js';

// Mock report data
const mockReports = [
  {
    id: '1',
    createdAt: new Date().toISOString(),
    filename: 'test1.jpg',
    prediction: 'healthy_skin',
    confidence: 0.95,
    all_predictions: { healthy_skin: 0.95, eczema: 0.03, psoriasis: 0.02 },
    imageDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEhIVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUWFRgYFhgXFxgYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKAA (truncated)',
  },
  {
    id: '2',
    createdAt: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
    filename: 'test2.jpg',
    prediction: 'eczema',
    confidence: 0.78,
    all_predictions: { healthy_skin: 0.1, eczema: 0.78, psoriasis: 0.12 },
    imageDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEhIVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUWFRgYFhgXFxgYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIKA',
  },
];

console.log('Testing generateReportPDF with empty array...');
try {
  const emptyBlob = generateReportPDF([]);
  console.log('Empty array test passed. Blob size:', emptyBlob.size, 'bytes');
} catch (e) {
  console.error('Empty array test failed:', e.message);
}

console.log('Testing generateReportPDF with mock reports...');
try {
  const blob = generateReportPDF(mockReports);
  console.log('Mock reports test passed. Blob size:', blob.size, 'bytes');
  // We can try to get the array buffer to ensure the blob is valid
  blob.arrayBuffer().then(buf => {
    console.log('Blob array buffer length:', buf.byteLength, 'bytes');
    // Optionally write to file (requires fs)
    const fs = require('fs');
    const buffer = Buffer.from(buf);
    fs.writeFileSync('test-report.pdf', buffer);
    console.log('PDF written to test-report.pdf');
  }).catch(err => {
    console.error('Error processing blob array buffer:', err);
  });
} catch (e) {
  console.error('Mock reports test failed:', e.message);
}