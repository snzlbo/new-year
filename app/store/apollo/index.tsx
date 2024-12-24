"use client";
// ^ this file needs the "use client" pragma

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import awsmobile from "@/aws-exports";

function makeClient() {
  const httpLink = new HttpLink({
    uri: awsmobile.aws_appsync_graphqlEndpoint,
    fetchOptions: { cache: "no-store" },
    headers: {
      "x-api-key": awsmobile.aws_appsync_apiKey,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}