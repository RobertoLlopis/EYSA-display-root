import React from "react";
import { render, fireEvent, getByRole } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import { useAuthContext } from "../../context/AuthContext";
import Comments from "../../components/Comments/Comments";
import { mutationDeclarations } from "../../utils/mutationDeclarations";
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
describe("Comments", () => {
  const expectedComments = [
    { id: 1, user: "pepe", message: "I love this movie so much" },
    { id: 2, user: "juan", message: "Meh" },
    { id: 3, user: "pepito", message: "Yesss" },
  ];
  const expectedNewComment = {
    message: "Amazing",
    user: "Paco Porras",
  };
  const mocks = [
    {
      request: {
        query: mutationDeclarations.ADD_COMMENT,
        variables: {
          ...expectedNewComment,
          filmId: "1",
        },
      },
      newData: jest.fn(() => ({
        data: {
          addComment: {
            id: "4",
            ...expectedNewComment,
          },
        },
      })),
    },
  ];

  beforeEach(() => {
    useAuthContext.mockReturnValue({ user: "Paco Porras" });
  });

  test("Correctly rendered list of comments", () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Comments comments={expectedComments} filmId="1" />
      </MockedProvider>
    );
    let expectedTexts = [];
    expectedComments.forEach((c) => {
      expectedTexts.push(getByText(c.message));
      expectedTexts.push(getByText(c.user));
    });
    expectedTexts.forEach((text) => {
      expect(text).toBeVisible();
    });
  });

  test("Divider counts well replies", () => {
    const { getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Comments comments={expectedComments} filmId="1" />
      </MockedProvider>
    );
    const divider = getByRole("separator");
    expect(divider).toHaveTextContent(expectedComments.length + " replies");
  });

  test("Correctly rendered in client new comment after submit", async () => {
    const { getByText, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Comments comments={expectedComments} filmId="1" />
      </MockedProvider>
    );
    const textArea = getByRole("commentMessage");
    const submitButton = getByRole("sumbitComment");
    await act(async () => {
      fireEvent.change(textArea, {
        target: { value: expectedNewComment.message },
      });
      fireEvent.click(submitButton);
    });
    const newComment = getByText(expectedNewComment.message);
    const newUser = getByText(expectedNewComment.user);
    //const addCommentMutationMock = mocks[0].newData;
    expect(newComment).toBeVisible();
    expect(newUser).toBeVisible();
    //expect(addCommentMutationMock).toHaveBeenCalled();
  });
});
