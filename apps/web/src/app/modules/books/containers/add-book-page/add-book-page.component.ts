import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Book, BookService } from '@bookapp-angular/books-core';
import { FeedbackPlatformService } from '@bookapp-angular/core/src';
import { ConfirmDialogComponent } from '@web/ui/dialogs';

import { BookFormComponent } from '../../components/book-form/book-form.component';

@Component({
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.scss']
})
export class AddBookPageComponent implements OnInit {
  isLoading: boolean;
  book: Book;
  error: any;

  @ViewChild(BookFormComponent) private bookFormComponent: BookFormComponent;

  constructor(
    protected feedbackService: FeedbackPlatformService,
    private dialog: MatDialog,
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.book = this.route.snapshot.data.book;
  }

  save(book: Book) {
    const { id, ...rest } = book;
    return id ? this.update(id, rest) : this.create(rest);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.bookFormComponent.hasChanges()) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: {
          text:
            'There are unsaved changes on the page. Are you sure you want to leave?'
        }
      });

      return dialogRef.afterClosed().pipe(
        switchMap(result => {
          if (result) {
            return this.bookFormComponent
              .removeUploadedFiles()
              .pipe(switchMap(() => of(true)));
          }

          return of(false);
        })
      );
    } else {
      return true;
    }
  }

  private create(book: Book) {
    this.isLoading = true;
    this.bookService
      .create(book)
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        ({ data, errors }) => {
          if (data) {
            this.book = data.createBook;
            this.feedbackService.success('Book created!');
          }

          if (errors) {
            this.error = errors[errors.length - 1];
          }
        },
        err => {
          this.isLoading = false;
          this.error = err;
        }
      );
  }

  private update(id: string, book: Book) {
    this.isLoading = true;
    this.bookService
      .update(id, book)
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        ({ data, errors }) => {
          if (data) {
            this.book = data.updateBook;
            this.feedbackService.success('Book updated!');
          }

          if (errors) {
            this.error = errors[errors.length - 1];
          }
        },
        err => {
          this.isLoading = false;
          this.error = err;
        }
      );
  }
}
