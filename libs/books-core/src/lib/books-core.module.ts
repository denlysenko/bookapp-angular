import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { BookService } from './services';

@NgModule({
  imports: [CommonModule]
})
export class BooksCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BooksCoreModule,
      providers: [BookService]
    };
  }
}
