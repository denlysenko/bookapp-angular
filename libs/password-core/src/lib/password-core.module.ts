import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PasswordService } from './services';

@NgModule({
  imports: [CommonModule]
})
export class PasswordCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PasswordCoreModule,
      providers: [PasswordService]
    };
  }
}
