import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

import { BookCommentsBaseComponent } from '@bookapp-angular/books-core';

@Component({
  moduleId: module.id,
  selector: 'ba-book-comments',
  templateUrl: './book-comments.component.html',
  styleUrls: ['./book-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCommentsComponent extends BookCommentsBaseComponent {
  @ViewChild('listView') listView: ElementRef;
  @ViewChild('textView') textView: ElementRef;

  submitComment() {
    this.onCommentAdded.emit(this.text);
    this.text = '';
    this.textView.nativeElement.dismissSoftInput();

    setTimeout(() => {
      this.listView.nativeElement.scrollToIndex(this.comments.length - 1);
    }, 200);
  }
}
