import { NgModule } from '@angular/core';

import {
  AuthGuard,
  FeedbackPlatformService,
  RouterExtensions,
  StoragePlatformService,
  StoreService
} from '@bookapp-angular/core';
import { GraphQLModule, WebSocketImpl } from '@bookapp-angular/graphql';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { registerElement } from 'nativescript-angular/element-registry';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { FeedbackService } from './services/feedback.service';
import { LoaderService } from './services/loader.service';
import { StorageService } from './services/storage.service';

require('nativescript-websockets');

registerElement(
  'PreviousNextView',
  () => require('nativescript-iqkeyboardmanager').PreviousNextView
);

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    NativeScriptAnimationsModule,
    TNSFontIconModule.forRoot({
      mdi: './assets/material-design-icons.css'
    }),
    GraphQLModule.forRoot()
  ],
  providers: [
    AuthGuard,
    StoreService,
    LoaderService,
    // https://github.com/angular/angular-cli/issues/9358#issuecomment-373053053
    {
      provide: WebSocketImpl,
      useValue: WebSocket
    },
    {
      provide: StoragePlatformService,
      useClass: StorageService
    },
    {
      provide: RouterExtensions,
      useClass: TNSRouterExtensions
    },
    {
      provide: FeedbackPlatformService,
      useClass: FeedbackService
    }
  ]
})
export class CoreModule {}
