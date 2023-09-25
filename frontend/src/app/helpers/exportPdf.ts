import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToPdf(filename: string, tableElement: any) {
  let pdf = new jsPDF();
  autoTable(pdf, { html: tableElement });
  pdf.save(filename);
}
