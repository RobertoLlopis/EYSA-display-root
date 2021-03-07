import React from "react";
import { useRouter } from "next/router";
import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent } from "@testing-library/react";
import { useAuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import { ROUTES } from "../../utils/routes";
import Film from "../../pages/films/[id]";
jest.mock("next/router");
jest.mock("../../context/AuthContext");
jest.mock("../../context/ThemeContext");

describe("Single Film page", () => {
  let expectedFilm;
  let expectedRouterPush;
  let user;
  let theme = "light";
  let setTheme;

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  beforeEach(() => {
    expectedFilm = {
      id: "3",
      __typename: "Film",
      title: "Seven",
      director: "David Fincher",
      image: "https://i.imgur.com/g2uELGy.jpeg",
      productionYear: "1995",
      comments: [
        { id: 1, user: "pepe", message: "I love this movie so much" },
        { id: 2, user: "juan", message: "Meh" },
        { id: 3, user: "pepito", message: "Yesss" },
      ],
    };
    expectedRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: expectedRouterPush });
    useAuthContext.mockReturnValue({ user });
    setTheme = jest.fn();
    useThemeContext.mockReturnValue({ theme, setTheme });
  });
  test("Should render correctly film detail", () => {
    const { getByText, getByAltText } = render(
      <MockedProvider addTypename={false}>
        <Film film={expectedFilm} />
      </MockedProvider>
    );
    const title = getByText(expectedFilm.title);
    const director = getByText(expectedFilm.director);
    const year = getByText(expectedFilm.productionYear);
    const image = getByAltText("film picture");

    expect(title).toBeVisible();
    expect(director).toBeVisible();
    expect(year).toBeVisible();
    expect(image).toBeVisible();
    expect(image).toHaveAttribute("src", expectedFilm.image);
  });
  test("Should redirect to login due tu falsy user", () => {
    user = null;
    render(
      <MockedProvider addTypename={false}>
        <Film film={expectedFilm} />
      </MockedProvider>
    );
    expect(expectedRouterPush).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});
