import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Reading } from '@bookapp-angular/auth-core';

import { Subject } from 'rxjs';

declare var ePubReader: any;

@Component({
  selector: 'ba-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookReaderComponent implements OnInit, OnDestroy {
  destroy$: Subject<Reading> = new Subject();

  @Input()
  src: string;

  @Input()
  bookmark: string;

  private reader: any;

  ngOnInit() {
    this.reader = ePubReader(this.src);
    if (this.bookmark) {
      this.reader.rendition.display(this.bookmark);
    }
  }

  ngOnDestroy() {
    this.destroy$.next({
      epubUrl: this.src,
      bookmark: this.reader.rendition.currentLocation().start.cfi
    });
    this.destroy$.complete();
  }
}
