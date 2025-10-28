import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";

const API_HOST = import.meta.env.VITE_GRAPHQL_URL;
const TOKEN_KEY = "auth_token";

const httpLink = new HttpLink({
  uri: API_HOST,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(TOKEN_KEY);

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

const errorLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: (result) => {
        if (result.errors) {
          result.errors.forEach((error) => {
            console.error(
              `[GraphQL error]: Message: ${error.message}, Code: ${error.extensions?.code}, Path: ${error.path}`
            );
            if (error.extensions?.code === "UNAUTHENTICATED") {
              localStorage.removeItem("TOKEN_KEY");
              window.location.href = "/login";
            }
          });
        }
        observer.next(result);
      },
      error: (networkError) => {
        console.error(`[Network error]: ${networkError}`);
        observer.error(networkError);
      },
      complete: observer.complete.bind(observer),
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
