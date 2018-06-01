import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

export abstract class FormBaseComponent {
  form: FormGroup;
  errors: { [key: string]: string } = {};

  protected snackBar: MatSnackBar;

  protected handleError(err: any) {
    if (err.errors) {
      const error = err.errors;
      Object.keys(error).forEach(key => {
        const formControl = this.form.get(key);
        if (formControl) {
          formControl.setErrors({ serverError: true });
          this.errors[key] = error[key].message;
        }
      });
    } else if (err.message && err.message.message) {
      this.snackBar.open(err.message.message);
    }
  }
}
