import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthCoreModule } from '@bookapp-angular/auth-core';

import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthCoreModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [...containers, ...components]
})
export class AuthModule {}
