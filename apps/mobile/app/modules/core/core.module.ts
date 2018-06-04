import { NgModule } from '@angular/core';

import { RouterExtensions, StoragePlatformService } from '@bookapp-angular/core';
import { GraphQLModule } from '@bookapp-angular/graphql';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router';

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    TNSFontIconModule.forRoot({
      mdi: 'material-design-icons.css'
    }),
    GraphQLModule.forRoot()
  ],
  providers: [
    {
      provide: StoragePlatformService,
      useClass: StorageService
    },
    {
      provide: RouterExtensions,
      useClass: TNSRouterExtensions
    }
  ]
})
export class CoreModule {}
