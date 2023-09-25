import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { BookDto, NewBook } from 'src/app/models/bookDto';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-book-modal',
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.scss'],
})
export class CreateBookModalComponent extends BaseComponent implements OnInit {
  @Output() public bookCreated = new EventEmitter<BookDto>();
  @Output() public bookUpdated = new EventEmitter<BookDto>();

  public bookForm!: FormGroup;
  @Input() data: BookDto | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateBookModalComponent>,
    private fb: FormBuilder,
    private bookService: BookService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public book: BookDto | null
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.bookForm = this.fb.group({
      title: [
        this.book ? this.book.title : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      description: [
        this.book ? this.book.description : '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      publicationDate: [
        this.book ? this.book.publicationDate : '',
        Validators.required,
      ],
      pagesCount: [
        this.book ? this.book.pagesCount : '',
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  public submit(): void {
    if (!this.bookForm.valid) {
      return;
    }

    const newBook: NewBook = {
      title: this.bookForm.value.title,
      description: this.bookForm.value.description,
      publicationDate: this.bookForm.value.publicationDate,
      pagesCount: this.bookForm.value.pagesCount,
    };

    if (this.book) {
      this.updateBook(newBook);
    } else {
      this.addBook(newBook);
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  private addBook(newBook: NewBook) {
    this.bookService
      .addBook(newBook)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (createdBook: BookDto) => {
          this.dialogRef.close(createdBook);
          this.notificationService.info('Book created successfully');
          this.bookCreated.emit(createdBook);
        },
        () => {
          this.notificationService.error('Failed to create a book');
        }
      );
  }

  private updateBook(bookValues: NewBook) {
    this.bookService
      .updateBook(this.book!.id.toString(), bookValues)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (updatedBook: BookDto) => {
          this.dialogRef.close(updatedBook);
          this.notificationService.info('Book was updated');
          this.bookUpdated.emit(updatedBook);
        },
        () => {
          this.notificationService.error('Failed to update a book');
        }
      );
  }
}
