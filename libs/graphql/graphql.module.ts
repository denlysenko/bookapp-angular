import { HttpHeaders } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { StoragePlatformService } from '@bookapp-angular/core/services/storage.platform.service';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { AUTH_TOKEN } from '../core/constants';
import { environment } from '../core/environments/environment';

interface Definintion {
  kind: string;
  operation?: string;
}

export function createApolloFactory(
  httpLink: HttpLink,
  storageService: StoragePlatformService
) {
  const http = httpLink.create({
    uri: environment.endpointUrl
  });

  const ws = new WebSocketLink({
    uri: environment.subscriptionsEndpoint,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: storageService.getItem(AUTH_TOKEN)
      }
    }
  });

  const auth = setContext(() => {
    const token = storageService.getItem(AUTH_TOKEN);
    if (!token) {
      return {};
    } else {
      return {
        headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
      };
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation }: Definintion = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    auth.concat(http)
  );

  return {
    link,
    cache: new InMemoryCache()
  };
}

@NgModule({
  imports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GraphQLModule,
      providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApolloFactory,
          deps: [HttpLink, StoragePlatformService]
        }
      ]
    };
  }
}
