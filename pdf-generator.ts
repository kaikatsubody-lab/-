import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Clone the element to modify styles for PDF generation without affecting the view
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = '800px'; // Fixed width for A4 consistency
    clone.style.padding = '20px';
    clone.style.background = '#1a1a2e'; // Ensure background color is set
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#1a1a2e',
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("talent-diagnosis-result.pdf");
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};

export const printResult = () => {
  window.print();
};
