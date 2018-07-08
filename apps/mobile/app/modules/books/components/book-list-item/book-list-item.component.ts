import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Book } from '@bookapp-angular/books-core';

@Component({
  moduleId: module.id,
  selector: 'ba-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListItemComponent {
  @Input() book: Book;
}
