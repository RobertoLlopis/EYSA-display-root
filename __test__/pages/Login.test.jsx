import React from "react";
import { useRouter } from "next/router";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import { useAuthContext } from "../../context/AuthContext";
import Login from "../../pages/login/index";
jest.mock("next/router");
jest.mock("../../context/AuthContext");
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
describe("Login", () => {
  let expectedLoggedUser = {
    password: "amazing",
    user: "Paco Porras",
  };
  let expectedRouterBack;
  let setUser;
  beforeEach(() => {
    setUser = jest.fn();
    useAuthContext.mockReturnValue({ setUser });
    expectedRouterBack = jest.fn();
    useRouter.mockReturnValue({ back: expectedRouterBack });
    global.Storage.prototype.setItem = jest.fn();
  });

  test("Correctly rendered required error display (No password)", async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(
      <MockedProvider addTypename={false}>
        <Login />
      </MockedProvider>
    );
    const userInput = getByPlaceholderText("Your username...");
    const submitButton = getByRole("submitButton");
    await act(async () => {
      fireEvent.change(userInput, {
        target: { value: expectedLoggedUser.user },
      });
      fireEvent.click(submitButton);
    });
    const errorMessage = await waitFor(() =>
      getByText("Please input your password!")
    );
    expect(errorMessage).toBeVisible();
  });
  test("Correctly rendered required error display (No user)", async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(
      <MockedProvider addTypename={false}>
        <Login />
      </MockedProvider>
    );
    const passwordInput = getByPlaceholderText("Your password...");
    const submitButton = getByRole("submitButton");
    await act(async () => {
      fireEvent.change(passwordInput, {
        target: { value: expectedLoggedUser.password },
      });
      fireEvent.click(submitButton);
    });
    const errorMessage = await waitFor(() =>
      getByText("Please input your username!")
    );
    expect(errorMessage).toBeVisible();
  });
  test("Correctly submition", async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(
      <MockedProvider addTypename={false}>
        <Login />
      </MockedProvider>
    );
    const userInput = getByPlaceholderText("Your username...");
    const passwordInput = getByPlaceholderText("Your password...");
    const submitButton = getByRole("submitButton");
    await act(async () => {
      fireEvent.change(passwordInput, {
        target: { value: expectedLoggedUser.password },
      });
      fireEvent.change(userInput, {
        target: { value: expectedLoggedUser.user },
      });
      fireEvent.click(submitButton);
    });
    expect(setUser).toHaveBeenLastCalledWith(expectedLoggedUser.user);
    expect(expectedRouterBack).toHaveBeenCalled();
    expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
      "user",
      expectedLoggedUser.user
    );
  });
});
