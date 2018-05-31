import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ba-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {
  form: FormGroup;
  isLoggingIn = true;

  @Output() onFormSubmit = new EventEmitter<any>();

  private firstNameField: AbstractControl;
  private lastNameField: AbstractControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  toggleAuthMode() {
    this.isLoggingIn = !this.isLoggingIn;
    this.isLoggingIn ? this.disableFields() : this.enableFields();
  }

  submit() {
    if (this.form.valid) {
      this.onFormSubmit.emit(this.form.value);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.firstNameField = this.form.get('firstName');
    this.lastNameField = this.form.get('lastName');
    this.disableFields();
  }

  private enableFields() {
    this.firstNameField.enable();
    this.lastNameField.enable();
  }

  private disableFields() {
    this.firstNameField.disable();
    this.lastNameField.disable();
  }
}
