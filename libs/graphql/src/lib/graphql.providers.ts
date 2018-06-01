import { HttpHeaders } from '@angular/common/http';

import { AUTH_TOKEN, environment, StoragePlatformService } from '@bookapp-angular/core/src';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

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

export const PROVIDERS = [
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApolloFactory,
    deps: [HttpLink, StoragePlatformService]
  }
];
