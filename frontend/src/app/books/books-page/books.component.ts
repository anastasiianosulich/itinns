import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { BookDto } from 'src/app/models/bookDto';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CreateBookModalComponent } from '../create-book-modal/create-book-modal.component';
import { toCamelCase } from '../../helpers/toCamelCase';
import { BooksChartComponent } from '../books-chart/books-chart.component';
import { exportToExcelFile } from 'src/app/helpers/exportExcel';
import { exportToPdf } from 'src/app/helpers/exportPdf';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent extends BaseComponent implements OnInit {
  public books: BookDto[] = [];
  public processedBooks: BookDto[] = [];

  sortByOptions: SortOption[] = Object.values(SortOption);
  selectedSortOption: SortOption = SortOption.Title;

  columns = ['Title', 'Description', 'Publication Date', 'Pages Count'];
  filterText: string = '';
  currentSortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  public loadBooks(): void {
    this.bookService
      .getAllBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (books: BookDto[]) => {
          this.books = books;
          this.processedBooks = this.books;
        },
        () => {
          this.notificationService.error('Failed to load books');
        }
      );
  }

  public openAddBookModal(book: BookDto | null): void {
    const dialogRef = this.dialog.open(CreateBookModalComponent, {
      width: '400px',
      height: '65%',
      data: book,
    });

    dialogRef.componentInstance.bookCreated.subscribe(
      (createdBook: BookDto) => {
        this.books.push(createdBook);
      }
    );

    dialogRef.componentInstance.bookUpdated.subscribe(
      (updatedBook: BookDto) => {
        this.loadBooks();
      }
    );
  }

  public openChartModal(): void {
    const dialogRef = this.dialog.open(BooksChartComponent, {
      width: '65vw',
      height: '60vh',
    });
  }

  applyFilter() {
    if (this.filterText.trim() === '') {
      this.processedBooks = this.books;
    } else {
      this.processedBooks = this.books.filter((book) =>
        book.title.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }

    this.sortData(this.currentSortOrder);
  }

  public sortData(order: 'asc' | 'desc') {
    this.processedBooks.sort((a, b) => {
      const propName = toCamelCase(this.selectedSortOption.toString());

      const aValue = a[propName as keyof BookDto];
      const bValue = b[propName as keyof BookDto];

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    this.currentSortOrder = order;
  }

  public handleDateRangeChange(event: { startDate: Date; endDate: Date }) {
    this.applyFilter();

    this.processedBooks = this.processedBooks.filter((b) => {
      const publicationDate = new Date(b.publicationDate);

      return event.startDate
        ? publicationDate >= event.startDate
        : true && event.endDate
        ? publicationDate <= event.endDate
        : true;
    });
  }

  exportData() {
    const selectElement: HTMLSelectElement | null = document.getElementById(
      'export-select'
    ) as HTMLSelectElement | null;
    if (selectElement) {
      const selectedOption = selectElement.value;

      const originalTable = document.getElementById('books-table')!;
      const copiedTable = originalTable.cloneNode(true) as HTMLTableElement;

      const rows = copiedTable.rows;
      const numColumns = copiedTable.rows[0].cells.length;

      for (let i = 0; i < rows.length; i++) {
        rows[i].deleteCell(numColumns - 1);
      }

      const filename = 'Books';

      if (selectedOption === ExportOption.Excel) {
        exportToExcelFile(filename, 'BooksInventory', copiedTable);
      } else if (selectedOption === ExportOption.Pdf) {
        exportToPdf(filename, copiedTable);
      }
      selectElement.value = 'null';
    }
  }
}

enum SortOption {
  Title = 'Title',
  PublicationDate = 'Publication Date',
  PagesCount = 'Pages Count',
}

enum ExportOption {
  Pdf = 'pdf',
  Excel = 'excel',
}
