import { ModuleWithProviders, NgModule } from '@angular/core';

import { StoragePlatformService } from '@bookapp-angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

import { createApolloFactory, WebSocketImpl } from './graphql.providers';

@NgModule({
  imports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  static forRoot(webSocketImpl = null): ModuleWithProviders {
    return {
      ngModule: GraphQLModule,
      // https://github.com/angular/angular-cli/issues/9358#issuecomment-373053053
      providers: [
        {
          provide: WebSocketImpl,
          useValue: webSocketImpl
        },
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApolloFactory,
          deps: [HttpLink, StoragePlatformService, WebSocketImpl]
        }
      ]
    };
  }
}
