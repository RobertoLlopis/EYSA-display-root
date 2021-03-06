import { render } from "@testing-library/react";
import Head from "next/head";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext, Theme } from "../context/ThemeContext";

const mockInitialState = {
  "Film:1": {
    id: "1",
    __typename: "Film",
    title: "The Godfather",
    director: "Francis Ford Coppola",
    image: "https://i.imgur.com/3vb1PgL.png",
    productionYear: "1972",
  },
  "Film:2": {
    id: "2",
    __typename: "Film",
    title: "Apocalypse Now",
    director: "Francis Ford Coppola",
    image: "https://i.imgur.com/aJwpvnd.png",
    productionYear: "1979",
  },
  "Film:3": {
    id: "3",
    __typename: "Film",
    title: "Seven",
    director: "David Fincher",
    image: "https://i.imgur.com/g2uELGy.jpeg",
    productionYear: "1995",
  },
  "Film:4": {
    id: "4",
    __typename: "Film",
    title: " American History X",
    director: "Tony Kaye",
    image: "https://i.imgur.com/gZxFnSe.png",
    productionYear: "1998",
  },
  "Film:5": {
    id: "5",
    __typename: "Film",
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    image: "https://i.imgur.com/qcwmtOP.jpg",
    productionYear: "1994",
  },
  "Film:6": {
    id: "6",
    __typename: "Film",
    title: "12 Angry Men",
    director: "Sidney Lumet",
    image: "https://i.imgur.com/sSBy9hn.png",
    productionYear: "1957",
  },
  ROOT_QUERY: {
    __typename: "Query",
    films: [
      { __ref: "Film:1" },
      { __ref: "Film:2" },
      { __ref: "Film:3" },
      { __ref: "Film:4" },
      { __ref: "Film:5" },
      { __ref: "Film:6" },
    ],
  },
};

const _appRender = ({ children }) => {
  return (
    <>
      <Head>
        <title>Air Company Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};
const customRender = (ui, options) =>
  render(ui, {
    wrapper: _appRender,
    ...options,
  });
export * from "@testing-library/react";
export { customRender as render };
