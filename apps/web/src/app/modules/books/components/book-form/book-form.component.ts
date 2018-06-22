import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Book } from '@bookapp-angular/books-core';
import { FeedbackPlatformService, FormBaseComponent } from '@bookapp-angular/core';

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
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({});
  }
}
