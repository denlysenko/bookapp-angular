import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { BookFilter } from '@bookapp-angular/books-core';
import { BaseComponent } from '@bookapp-angular/core';

@Component({
  selector: 'ba-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFilterComponent extends BaseComponent implements OnInit {
  searchQuery = new FormControl();
  sortValue = 'id_desc';

  @Input()
  set filter(value: BookFilter) {
    if (value && value.searchQuery) {
      this.searchQuery.setValue(value.searchQuery, { emitEvent: false });
    }

    if (value && value.sortValue) {
      this.sortValue = value.sortValue;
    }
  }

  @Output() onSort = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter<string>();

  ngOnInit() {
    this.searchQuery.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(val => this.onSearch.emit(val));
  }

  sort(e: MatButtonToggleChange) {
    this.onSort.emit(e.value);
  }
}
