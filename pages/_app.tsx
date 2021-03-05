import Head from "next/head";
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/apollo";
import { AuthContext } from "../context/AuthContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  if (typeof window !== "undefined") {
    var storageUser = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;
  }
  const [user, setUser] = useState(storageUser);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Head>
          <title>Air Company Catalog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
