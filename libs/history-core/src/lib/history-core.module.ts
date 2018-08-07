import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { LogsResolver } from './resolvers';
import { HistoryService } from './services';

@NgModule({
  imports: [CommonModule]
})
export class HistoryCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HistoryCoreModule,
      providers: [HistoryService, LogsResolver]
    };
  }
}
