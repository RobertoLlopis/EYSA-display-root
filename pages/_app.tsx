import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import { useApollo } from "src/apollo";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Air Company Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
