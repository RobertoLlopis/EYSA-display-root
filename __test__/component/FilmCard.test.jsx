import React from "react";
import { useRouter } from "next/router";
import { render, fireEvent } from "@testing-library/react";
import { ROUTES } from "../../utils/routes";
import FilmCard from "../../components/FilmCard/FilmCard";
jest.mock("next/router");

describe("FilmCard", () => {
  let expectedFilm;
  let expectedRouterPush;
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
  test("should render title, director and image", () => {
    const { getByText, getByAltText } = render(
      <FilmCard film={expectedFilm} />
    );
    const title = getByText(expectedFilm.title);
    const director = getByText(expectedFilm.director);
    const image = getByAltText(expectedFilm.title + " film picture");

    expect(title).toBeVisible();
    expect(director).toBeVisible();
    expect(image).toBeVisible();
  });
  test("should redirect next router to film´s id dynamic page", () => {
    const { getByRole } = render(<FilmCard film={expectedFilm} />);
    const filmCard = getByRole("filmCard");
    const expectedId = expectedFilm.id;
    fireEvent.click(filmCard);

    expect(expectedRouterPush).toHaveBeenCalledTimes(1);
    expect(expectedRouterPush).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: ROUTES.FILM_DETAIL,
        query: { id: expectedId },
      })
    );
  });
});
