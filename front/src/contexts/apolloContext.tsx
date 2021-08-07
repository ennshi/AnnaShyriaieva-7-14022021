import React, { useContext, useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { createContext } from "react";
import { setContext } from "@apollo/client/link/context";

type ApolloCtxType = {
  client: ApolloClient<NormalizedCacheObject>;
  setToken: (token: string) => void;
  clearToken: () => void;
  token: string | null;
  isSignedIn: boolean;
};

//@ts-ignore
const ApolloContext = createContext<ApolloCtxType>({});

const httpLink = createUploadLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const clearToken = () => {
    setToken(null);
  };

  return (
    <ApolloContext.Provider
      value={{ client, setToken, token, isSignedIn: !!token, clearToken }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloContext.Provider>
  );
};

export const useApollo = () => {
  const ctx = useContext(ApolloContext);
  return ctx;
};
