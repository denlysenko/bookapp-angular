import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { forkJoin, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Book } from '@bookapp-angular/books-core';
import { FeedbackPlatformService, FormBaseComponent } from '@bookapp-angular/core';
import { UploadService } from '@web/modules/core/services';
import { FileSelectorComponent } from '@web/ui/file-selector';
import { ImageSelectorComponent } from '@web/ui/image-selector';
import { isEqual } from 'lodash';

@Component({
  selector: 'ba-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  providers: [UploadService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent extends FormBaseComponent implements OnDestroy {
  @Input() loading: boolean;
  @Input()
  set book(value: Book) {
    if (value) {
      this._book = value;
    }
    this.initForm();
  }
  get book(): Book {
    return this._book;
  }

  @Input()
  set error(value: any) {
    if (value) {
      this.handleError(value);
    }
  }

  @Output() onFormSubmit = new EventEmitter<Book>();

  private _book: Book;
  private onDestroy = new Subject();
  private initialFormValue: any;

  constructor(
    protected feedbackService: FeedbackPlatformService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private location: Location,
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef
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

  goBack() {
    this.location.back();
  }

  showCoverSelector() {
    const dialogRef = this.dialog.open(ImageSelectorComponent, {
      width: '300px',
      data: { maintainAspectRatio: false }
    });

    dialogRef.afterClosed().subscribe(coverUrl => {
      if (coverUrl) {
        this.form.patchValue(
          { coverUrl },
          { onlySelf: true, emitEvent: false }
        );
        this.cdr.detectChanges();
      }
    });
  }

  showFileSelector() {
    const dialogRef = this.dialog.open(FileSelectorComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(epubUrl => {
      if (epubUrl) {
        this.form.patchValue({ epubUrl }, { onlySelf: true, emitEvent: false });
        this.cdr.detectChanges();
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.onFormSubmit.emit(this.form.value);
    }
  }

  hasChanges() {
    return !isEqual(this.form.value, this.initialFormValue);
  }

  removeUploadedFiles() {
    const observables = [];

    if (this.form.value.coverUrl !== this.initialFormValue.coverUrl) {
      const splitted = this.form.value.coverUrl.split('/'); // take last part of uri as a key
      observables.push(
        this.uploadService.deleteFile(splitted[splitted.length - 1])
      );
    }

    if (this.form.value.epubUrl !== this.initialFormValue.epubUrl) {
      const splitted = this.form.value.epubUrl.split('/'); // take last part of uri as a key
      observables.push(
        this.uploadService.deleteFile(splitted[splitted.length - 1])
      );
    }

    if (observables.length) {
      return forkJoin(observables);
    }

    return of(null);
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  private initForm() {
    this.form = this.fb.group({
      id: [(this.book && this.book.id) || null],
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
    this.initialFormValue = Object.assign({}, this.form.value);
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
