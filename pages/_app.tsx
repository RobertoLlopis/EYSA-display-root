import Head from "next/head";
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/apollo";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext, Theme } from "../context/ThemeContext";
import { forceBackgroundToBeThemed, forceTextToBeThemed } from "../utils/utils";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const color = theme === "light" ? "#333" : "#FFF";
  const backgroundColor = theme === "light" ? "#FFF" : "#3a3a3a";

  if (typeof window !== "undefined") {
    var storageUser = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;
    forceTextToBeThemed(color);
    forceBackgroundToBeThemed(backgroundColor);
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
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
