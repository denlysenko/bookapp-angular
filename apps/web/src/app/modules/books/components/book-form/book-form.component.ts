import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Book } from '@bookapp-angular/books-core';
import { FeedbackPlatformService, FormBaseComponent } from '@bookapp-angular/core';
import { FileSelectorComponent } from '@web/ui/file-selector';
import { ImageSelectorComponent } from '@web/ui/image-selector';

@Component({
  selector: 'ba-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent extends FormBaseComponent
  implements OnInit, OnDestroy {
  @Input() book: Book;
  @Output() onFormSubmit = new EventEmitter<Book>();

  private onDestroy = new Subject();

  constructor(
    protected feedbackService: FeedbackPlatformService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    super();
  }

  get coverUrl(): string {
    return this.form.get('coverUrl').value;
  }

  get epubUrl(): string {
    return this.form.get('epubUrl').value;
  }

  get isPaid(): boolean {
    return this.form.get('paid').value;
  }

  ngOnInit() {
    this.initForm();
  }

  showCoverSelector() {
    const dialogRef = this.dialog.open(ImageSelectorComponent, {
      width: '300px',
      data: { maintainAspectRatio: false }
    });

    dialogRef.afterClosed().subscribe(cover => {
      if (cover) {
        console.log(cover);
      }
    });
  }

  showFileSelector() {
    const dialogRef = this.dialog.open(FileSelectorComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(epub => {
      if (epub) {
        console.log(epub);
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.onFormSubmit.emit(this.form.value);
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  private initForm() {
    this.form = this.fb.group({
      title: [(this.book && this.book.title) || null, Validators.required],
      author: [(this.book && this.book.author) || null, Validators.required],
      description: [
        (this.book && this.book.description) || null,
        Validators.required
      ],
      paid: [(this.book && this.book.paid) || false],
      price: [(this.book && this.book.price) || null, Validators.required],
      coverUrl: [(this.book && this.book.coverUrl) || null],
      epubUrl: [(this.book && this.book.epubUrl) || null]
    });

    this.togglePriceField(this.form.get('price').value);

    this.form
      .get('paid')
      .valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe(this.togglePriceField.bind(this));
  }

  private togglePriceField(val: boolean) {
    const priceField = this.form.get('price');
    if (val) {
      priceField.enable();
    } else {
      priceField.disable();
    }
  }
}
