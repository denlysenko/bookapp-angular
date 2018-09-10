import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NativeScriptRouterModule } from 'nativescript-angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NgShadowModule } from 'nativescript-ngx-shadow';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { components } from './components';
import { containers } from './containers';
import { routes } from './history.routing';

@NgModule({
  imports: [
    CommonModule,
    NativeScriptCommonModule,
    RouterModule.forChild(routes),
    NgShadowModule,
    NativeScriptUIListViewModule,
    NativeScriptRouterModule
  ],
  declarations: [...containers, ...components],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HistoryModule {}
