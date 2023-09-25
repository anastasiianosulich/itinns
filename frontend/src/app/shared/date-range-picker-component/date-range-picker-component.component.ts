import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-range-picker-component',
  templateUrl: './date-range-picker-component.component.html',
  styleUrls: ['./date-range-picker-component.component.scss'],
})
export class DateRangePickerComponentComponent {
  selectedOption: string = 'disabled';

  @Output() dateRangeChanged = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();

  selectedDateRange!: { startDate: Date; endDate: Date };

  startDate = new FormControl();
  endDate = new FormControl();

  onDateOptionChange(): void {
    if (this.selectedOption === 'currentMonth') {
      const today = new Date();
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );

      this.startDate.setValue(firstDayOfMonth);
      this.endDate.setValue(lastDayOfMonth);

      this.emitDateRangeChangeEvent();
    } else if (this.selectedOption === 'currentYear') {
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

      this.startDate.setValue(firstDayOfYear);
      this.endDate.setValue(lastDayOfYear);

      this.emitDateRangeChangeEvent();
    } else {
      this.resetDatePickers();
    }
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.selectedOption = 'disabled';

    this.emitDateRangeChangeEvent();
  }

  resetDatePickers() {
    this.startDate.setValue(null);
    this.endDate.setValue(null);

    this.emitDateRangeChangeEvent();
  }

  private emitDateRangeChangeEvent() {
    this.selectedDateRange = {
      startDate: this.startDate.value,
      endDate: this.endDate.value,
    };
    this.dateRangeChanged.emit(this.selectedDateRange);
  }
}
