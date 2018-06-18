import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FeedbackPlatformService } from '@bookapp-angular/core/src';
import { PasswordFormBaseComponent } from '@bookapp-angular/password-core';
import { getViewById } from 'ui/core/view';
import { Page } from 'ui/page';

import { passwordMetadata, PasswordViewModel } from '../../models';

@Component({
  moduleId: module.id,
  selector: 'ba-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormComponent extends PasswordFormBaseComponent
  implements OnInit, AfterViewInit {
  metadata = passwordMetadata;
  password: PasswordViewModel;
  dataform: any;

  @Output() backTapped = new EventEmitter<void>();

  constructor(
    protected feedbackService: FeedbackPlatformService,
    private page: Page
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.dataform = getViewById(this.page, 'passwordForm');
  }

  submit() {
    this.dataform.validateAll().then(result => {
      if (result) {
        this.onFormSubmit.emit(this.password);
      }
    });
  }

  private initForm() {
    this.password = new PasswordViewModel();
  }
}
