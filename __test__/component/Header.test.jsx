import React from "react";
import { useRouter } from "next/router";
import { render, fireEvent } from "@testing-library/react";
import { useAuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import { ROUTES } from "../../utils/routes";
import Header from "../../components/Header/Header";
import Toggle from "../../components/Header/Toggle/Toggle";

jest.mock("next/router");
jest.mock("../../context/AuthContext");
jest.mock("../../context/ThemeContext");

describe("Header and Toggle", () => {
  let theme = "light";
  let setTheme;
  beforeEach(() => {
    setTheme = jest.fn();
    useThemeContext.mockReturnValue({ theme, setTheme });
  });
  describe("Header", () => {
    let expectedRouterPush;
    let setUser;
    beforeEach(() => {
      expectedRouterPush = jest.fn();
      useRouter.mockReturnValue({ push: expectedRouterPush });
      setUser = jest.fn();
      useAuthContext.mockReturnValue({ setUser });
      global.Storage.prototype.removeItem = jest.fn();
    });
    test("should be visible text of the page and have correct href attribute", () => {
      const { getByText, getByTestId } = render(<Header />);
      const homeLink = getByTestId("home");
      const homeAnchorTest = getByText("Home");
      const filmsLink = getByTestId("films");
      const filmsAnchorTest = getByText("Films");

      expect(homeAnchorTest).toBeVisible();
      expect(filmsAnchorTest).toBeVisible();
      expect(homeLink).toHaveAttribute("href", ROUTES.HOME);
      expect(filmsLink).toHaveAttribute("href", ROUTES.FILMS);
    });
    test("should sign out button reset user and remove item from local storage", () => {
      const { getByText } = render(<Header />);
      const sigOutBtn = getByText("Sign out");

      fireEvent.click(sigOutBtn);
      expect(setUser).toHaveBeenCalledWith(null);
      expect(global.Storage.prototype.removeItem).toHaveBeenCalledWith("user");
    });
    test("should sign out button redirect to login page", () => {
      const { getByText } = render(<Header />);
      const sigOutBtn = getByText("Sign out");

      fireEvent.click(sigOutBtn);
      expect(expectedRouterPush).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });
  describe("Toggle", () => {
    test("When theme 'light', header is capitalized, and input is not checked", () => {
      const { getByText, getByRole } = render(<Toggle />);
      const header = getByText("Light");
      const input = getByRole("theme-toggle");
      expect(header).toBeVisible();
      expect(input).not.toHaveAttribute("checked");
    });
    test("Name of theme is capitalized", () => {
      theme = "dark";
      useThemeContext.mockReturnValue({ theme, setTheme });
      const { getByText, getByRole } = render(<Toggle />);
      const header = getByText("Dark");
      const input = getByRole("theme-toggle");
      expect(header).toBeVisible();
      expect(input).toHaveAttribute("checked");
    });
  });
});
