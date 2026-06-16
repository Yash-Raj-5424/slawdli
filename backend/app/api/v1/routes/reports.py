from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import StreamingResponse
from app.services.prediction_service import prediction_service
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import io
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/export-pdf")
async def export_report_pdf():
    """
    Export aggregate statistics as PDF.
    """
    try:
        stats = prediction_service.get_prediction_stats()

        # Create a BytesIO buffer to receive PDF data
        buffer = io.BytesIO()

        # Create the PDF object, using the buffer as its "file"
        doc = SimpleDocTemplate(buffer, pagesize=letter)

        # Container for the 'Flowable' objects
        elements = []

        # Styles
        styles = getSampleStyleSheet()
        title_style = styles["Heading1"]
        normal_style = styles["Normal"]

        # Title
        title = Paragraph("Skin Disease Detection Report", title_style)
        elements.append(title)
        elements.append(Spacer(1, 12))

        # Statistics table data
        data = [
            ["Metric", "Value"],
            ["Total Predictions", stats["total_predictions"]],
            ["Average Confidence", f"{stats['average_confidence']:.4f}"],
            ["Earliest Timestamp", stats["earliest_timestamp"] or "N/A"],
            ["Latest Timestamp", stats["latest_timestamp"] or "N/A"],
        ]

        # Add prediction counts if any
        if stats["prediction_counts"]:
            data.append(["", ""])  # separator
            data.append(["Prediction Breakdown", ""])
            for pred_class, count in stats["prediction_counts"].items():
                data.append([pred_class, count])

        # Create table
        table = Table(data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))

        elements.append(table)

        # Build PDF
        doc.build(elements)

        # Get the value of the BytesIO buffer and write it to the response
        buffer.seek(0)
        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=report.pdf"}
        )

    except Exception as e:
        logger.error(f"Error generating PDF report: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate PDF report")