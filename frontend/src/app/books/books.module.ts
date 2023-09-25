import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CreateBookModalComponent } from './create-book-modal/create-book-modal.component';
import { BooksComponent } from './books-page/books.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BooksChartComponent } from './books-chart/books-chart.component';

@NgModule({
  declarations: [CreateBookModalComponent, BooksComponent, BooksChartComponent],
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class BooksModule {}
