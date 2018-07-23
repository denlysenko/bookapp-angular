import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { BookComment } from '@bookapp-angular/books-core';

@Component({
  selector: 'ba-book-comments',
  templateUrl: './book-comments.component.html',
  styleUrls: ['./book-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCommentsComponent {
  text = '';

  @Input() loading: boolean;
  @Input() comments: BookComment[];

  @ViewChild('list', { read: ElementRef })
  list: ElementRef;

  @Output() onCommentAdded = new EventEmitter<string>();

  addComment() {
    this.onCommentAdded.emit(this.text);
    this.text = '';
    setTimeout(() => {
      this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
    }, 200);
  }
}
