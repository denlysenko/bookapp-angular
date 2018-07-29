import { EventEmitter, Input, Output } from '@angular/core';

import { BookComment } from '../models';

export abstract class BookCommentsBaseComponent {
  text = '';

  @Input() loading: boolean;
  @Input() comments: BookComment[];

  @Output() onCommentAdded = new EventEmitter<string>();
}
