import React from "react";
import { useRouter } from "next/router";
import { render, fireEvent } from "../../utils/test-utils";
import FilmSnap from "../../components/TabCard/FilmSnap/FilmSnap";
import { ROUTES } from "../../utils/routes";
jest.mock("next/router");

describe("FilmSnap", () => {
  let expectedFilm;
  let expectedRouterPush;
  /* let router = {
    push: jest.fn(({ pathname, query }) => ({
      pathname,
      query,
    })),
  };
  let useRouter = jest.fn(() => router); */
  beforeEach(() => {
    expectedFilm = {
      id: "3",
      __typename: "Film",
      title: "Seven",
      director: "David Fincher",
      image: "https://i.imgur.com/g2uELGy.jpeg",
      productionYear: "1995",
    };
    expectedRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: expectedRouterPush });
  });
  test("should render title, director, image tag and propductionYear", () => {
    const { getByText, getByAltText } = render(
      <FilmSnap film={expectedFilm} />,
      {}
    );
    const title = getByText(expectedFilm.title);
    const director = getByText(expectedFilm.director);
    const year = getByText("Year " + expectedFilm.productionYear);
    const altText = getByAltText(expectedFilm.title + " film picture");

    expect(title).toBeVisible();
    expect(director).toBeVisible();
    expect(year).toBeVisible();
    expect(altText).toBeVisible();
  });
  test("should redirect next router to film´s id dynamic page", () => {
    const { getByRole } = render(<FilmSnap film={expectedFilm} />, {});
    const infoWrapper = getByRole("infoWrapper");
    const picWrapper = getByRole("picWrapper");
    const expectedId = expectedFilm.id;
    fireEvent.click(infoWrapper);
    fireEvent.click(picWrapper);

    expect(expectedRouterPush).toHaveBeenCalledTimes(2);
    expect(expectedRouterPush).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: ROUTES.FILM_DETAIL,
        query: { id: expectedId },
      })
    );
  });
});
