import { NgModule } from '@angular/core';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
  imports: [TNSFontIconModule, NativeScriptRouterModule],
  exports: [TNSFontIconModule, NativeScriptRouterModule]
})
export class SharedModule {}
