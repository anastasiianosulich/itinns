import * as XLSX from 'xlsx';

export function exportToExcelFile(
  filename: string,
  sheetName: string,
  tableElement: any
) {
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  XLSX.writeFile(wb, `${filename}.xlsx`);
}
