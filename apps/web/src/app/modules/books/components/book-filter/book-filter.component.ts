import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookFilterBaseComponent } from '@bookapp-angular/books-core';

@Component({
  selector: 'ba-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFilterComponent extends BookFilterBaseComponent {
  constructor() {
    super();
  }
}
