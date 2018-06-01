import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoragePlatformService } from '@bookapp-angular/core/src';
import { GraphQLModule } from '@bookapp-angular/graphql/src';
import { NxModule } from '@nrwl/nx';

import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NxModule.forRoot(),
    HttpClientModule,
    GraphQLModule.forRoot()
  ],
  providers: [
    {
      provide: StoragePlatformService,
      useClass: StorageService
    }
  ]
})
export class CoreModule {}
