import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpInternalService } from './http-internal.service';
import { BookDto, NewBook } from '../models/bookDto';
import { BooksByYear } from '../models/booksByYear';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly booksApiUrl = 'api/books';

  constructor(private httpService: HttpInternalService) {}

  public addBook(book: NewBook): Observable<BookDto> {
    return this.httpService.postRequest<BookDto>(this.booksApiUrl, book);
  }

  public updateBook(bookId: string, book: NewBook): Observable<BookDto> {
    const url = `${this.booksApiUrl}/${bookId}`;

    return this.httpService.putRequest<BookDto>(url, book);
  }

  public deleteBook(bookId: string): Observable<void> {
    const url = `${this.booksApiUrl}/${bookId}`;

    return this.httpService.deleteRequest<void>(url);
  }

  public getBook(bookId: string): Observable<BookDto> {
    const url = `${this.booksApiUrl}/${bookId}`;

    return this.httpService.getRequest<BookDto>(url);
  }

  public getBooksByYear(): Observable<BooksByYear[]> {
    const url = `${this.booksApiUrl}/byYear`;

    return this.httpService.getRequest<BooksByYear[]>(url);
  }

  public getAllBooks(): Observable<BookDto[]> {
    return this.httpService.getRequest<BookDto[]>(`${this.booksApiUrl}/all`);
  }
}
