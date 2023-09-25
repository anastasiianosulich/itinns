import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { BooksByYear } from 'src/app/models/booksByYear';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';

Chart.register(...registerables);

@Component({
  selector: 'app-books-chart',
  templateUrl: './books-chart.component.html',
  styleUrls: ['./books-chart.component.scss'],
})
export class BooksChartComponent extends BaseComponent implements OnInit {
  bookData: BooksByYear[] = [];

  constructor(
    private bookService: BookService,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadBookData();
  }

  private loadBookData() {
    this.bookService
      .getBooksByYear()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: BooksByYear[]) => {
          this.bookData = data;

          this.renderChart(
            '# of books',
            this.bookData.map((b) => b.year.toString()),
            this.bookData.map((b) => b.booksCount),
            'bar',
            'bar-chart'
          );
        },
        () => {
          this.notificationService.error('Failed to load book data');
        }
      );
  }

  private renderChart(
    label: string,
    labels: string[],
    data: number[],
    chartType: keyof ChartTypeRegistry,
    elementId: string
  ) {
    const chart = new Chart(elementId, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: ['grey'],
            borderColor: ['white'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20,
              color: 'white',
            },
          },
          x: {
            ticks: {
              color: 'white',
            },
          },
        },
      },
    });
  }
}
