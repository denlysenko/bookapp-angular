import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Book } from '@bookapp-angular/books-core';

@Component({
  selector: 'ba-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookViewComponent {
  @Input() book: Book;
}
