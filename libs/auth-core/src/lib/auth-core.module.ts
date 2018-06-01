import { ModuleWithProviders, NgModule } from '@angular/core';

import { AuthService } from '@bookapp-angular/auth-core/src/lib/services';

@NgModule()
export class AuthCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthCoreModule,
      providers: [AuthService]
    };
  }
}
