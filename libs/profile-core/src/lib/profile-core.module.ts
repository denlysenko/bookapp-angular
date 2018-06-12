import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ProfileService } from './services';

@NgModule()
export class ProfileCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileCoreModule,
      providers: [ProfileService]
    };
  }
}
