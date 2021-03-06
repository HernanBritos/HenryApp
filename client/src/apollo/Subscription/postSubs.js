import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API}/graphql`,
});
const wsLink = new WebSocketLink({
  uri: `${process.env.SW_REACT_APP_API}`,
  options: { reconnect: true },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
 


export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

