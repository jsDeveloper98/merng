import { ApolloLink, HttpLink } from "@apollo/client";

export const getApolloLink = (): ApolloLink => {
  const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });

  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });

    return forward(operation);
  });

  return authLink.concat(httpLink);
};
