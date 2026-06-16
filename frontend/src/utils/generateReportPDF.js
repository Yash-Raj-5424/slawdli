import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates a PDF report from an array of report objects.
 * @param {Array<Object>} reports - Array of report objects (from useReports hook)
 * @returns {Blob} PDF blob ready for download
 */
export function generateReportPDF(reports) {
  if (!reports || reports.length === 0) {
    // Create a simple PDF with a message
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('No reports available to generate PDF.', 20, 20);
    return doc.output('blob');
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Title
  doc.setFontSize(20);
  doc.setTextColor(30, 30, 30);
  doc.text('Skin Disease Detection Report', margin, yPosition);
  yPosition += 20;

  // Calculate statistics
  const totalReports = reports.length;
  const avgConfidence =
    reports.reduce((sum, r) => sum + r.confidence, 0) / totalReports;
  const timestamps = reports.map(r => new Date(r.createdAt));
  const earliestTimestamp = timestamps.reduce((a, b) => (a < b ? a : b));
  const latestTimestamp = timestamps.reduce((a, b) => (a > b ? a : b));

  // Prediction counts
  const predictionCounts = {};
  reports.forEach(r => {
    const pred = r.prediction;
    predictionCounts[pred] = (predictionCounts[pred] || 0) + 1;
  });

  // Statistics table data
  const statsData = [
    ['Metric', 'Value'],
    ['Total Reports', totalReports],
    ['Average Confidence', `${(avgConfidence * 100).toFixed(2)}%`],
    [
      'Earliest Timestamp',
      earliestTimestamp.toLocaleString(),
    ],
    ['Latest Timestamp', latestTimestamp.toLocaleString()],
  ];

  // Add statistics table
  yPosition += 10;
  autoTable(doc, {
    startY: yPosition,
    head: [statsData[0]],
    body: statsData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [128, 0, 128] }, // teal-ish? we'll use purple for now
    bodyStyles: { fillColor: [245, 245, 245] },
    margin: { left: margin, right: margin },
  });
  yPosition = doc.lastAutoTable.finalY + 10;

  // Prediction breakdown table (if any)
  if (Object.keys(predictionCounts).length > 0) {
    doc.setFontSize(16);
    doc.text('Prediction Breakdown', margin, yPosition);
    yPosition += 10;

    const breakdownData = [['Prediction', 'Count']];
    Object.entries(predictionCounts).forEach(([pred, count]) => {
      breakdownData.push([pred, count]);
    });

    autoTable(doc, {
      startY: yPosition,
      head: [breakdownData[0]],
      body: breakdownData.slice(1),
      theme: 'striped',
      headStyles: { fillColor: [128, 0, 128] },
      bodyStyles: { fillColor: [245, 245, 245] },
      margin: { left: margin, right: margin },
    });
    yPosition = doc.lastAutoTable.finalY + 10;
  }

  // Add footer with generation date
  const generationDate = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${generationDate}`, margin, pageHeight - margin - 10);

  return doc.output('blob');
}