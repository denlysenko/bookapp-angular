import { Component, OnInit, ViewChild } from '@angular/core';

import { Book } from '@bookapp-angular/books-core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BookFormComponent } from '@web/modules/books/components/book-form/book-form.component';
import { ConfirmDialogComponent } from '@web/ui/dialogs';

@Component({
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.scss']
})
export class AddBookPageComponent implements OnInit {
  @ViewChild(BookFormComponent) private bookFormComponent: BookFormComponent;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  save(event: Book) {
    console.log(event);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.bookFormComponent.hasChanges()) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: { text: 'There are unsaved changes on the page. Are you sure you want to leave?' }
      });

      return dialogRef.afterClosed();
    } else {
      return true;
    }
  }

}
