import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FeedbackPlatformService } from '@bookapp-angular/core';
import { PasswordFormBaseComponent } from '@bookapp-angular/password-core';

@Component({
  selector: 'ba-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormComponent extends PasswordFormBaseComponent
  implements OnInit {
  constructor(
    protected feedbackService: FeedbackPlatformService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  submit() {
    if (this.form.valid) {
      this.onFormSubmit.emit(this.form.value);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      newPassword: [null, Validators.required],
      oldPassword: [null, Validators.required]
    });
  }
}
