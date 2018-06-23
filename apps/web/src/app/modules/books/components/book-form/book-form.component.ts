import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Book } from '@bookapp-angular/books-core';
import { FeedbackPlatformService, FormBaseComponent } from '@bookapp-angular/core';
import { ImageSelectorComponent } from '@web/ui/image-selector';

@Component({
  selector: 'ba-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent extends FormBaseComponent implements OnInit {
  @Input() book: Book;
  @Output() onFormSubmit = new EventEmitter<Book>();

  constructor(
    protected feedbackService: FeedbackPlatformService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    super();
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

  showFileSelector() {}

  private initForm() {
    this.form = this.fb.group({});
  }
}
