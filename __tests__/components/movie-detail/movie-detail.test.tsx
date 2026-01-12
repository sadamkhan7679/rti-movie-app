import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Movie } from "@/types/movies/movie.types";
import MovieDetail from "@/components/modules/movie-details";
import { getMovieRating, getMovieYear } from "@/lib/utils";

const mockMovie: Movie = {
  adult: false,
  backdrop_path: "/ebyxeBh56QNXxSJgTnmz7fXAlwk.jpg",
  genre_ids: [28, 878, 12],
  id: 1242898,
  original_language: "en",
  original_title: "Predator: Badlands",
  overview:
    "Cast out from his clan, a young Predator finds an unlikely ally in a damaged android and embarks on a treacherous journey in search of the ultimate adversary.",
  popularity: 788.0559,
  poster_path: "/pHpq9yNUIo6aDoCXEBzjSolywgz.jpg",
  release_date: "2025-11-05",
  title: "Predator: Badlands",
  video: false,
  vote_average: 7.733,
  vote_count: 1274,
};

describe("MovieDetail", () => {
  it("should render movie title", () => {
    render(<MovieDetail movie={mockMovie} />);

    // Title appears in hero section
    const titles = screen.getAllByText(mockMovie.title);
    expect(titles.length).toBeGreaterThan(0);
  });

  it("should render movie poster", () => {
    render(<MovieDetail movie={mockMovie} />);

    const posters = screen.getAllByAltText(mockMovie.title);
    expect(posters.length).toBeGreaterThan(0);
    expect(posters[0]).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockMovie.poster_path)),
    );
  });

  it("should display movie year", () => {
    render(<MovieDetail movie={mockMovie} />);

    expect(
      screen.getByText(getMovieYear(mockMovie.release_date)),
    ).toBeInTheDocument();
  });

  it("should display rating", () => {
    render(<MovieDetail movie={mockMovie} />);

    expect(
      screen.getByText(getMovieRating(mockMovie.vote_average)),
    ).toBeInTheDocument();
  });

  it("should display overview text", () => {
    render(<MovieDetail movie={mockMovie} />);

    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
  });

  it("should render Add to Favorite button", () => {
    render(<MovieDetail movie={mockMovie} />);

    const button = screen.getByRole("button", { name: /add to favorite/i });
    expect(button).toBeInTheDocument();
  });

  it("should render trailers section", () => {
    render(<MovieDetail movie={mockMovie} />);

    expect(screen.getByText("TRAILERS")).toBeInTheDocument();
  });

  it("should render trailer buttons", () => {
    render(<MovieDetail movie={mockMovie} />);

    expect(screen.getByText("Play trailer 1")).toBeInTheDocument();
    expect(screen.getByText("Play trailer 2")).toBeInTheDocument();
  });

  it("should format release date correctly", () => {
    render(<MovieDetail movie={mockMovie} />);

    // Should show year
    expect(screen.getByText("2025")).toBeInTheDocument();
  });

  it("should handle different rating values", () => {
    const movieWithDifferentRating = { ...mockMovie, vote_average: 7.2 };
    render(<MovieDetail movie={movieWithDifferentRating} />);

    expect(screen.getByText("7.2")).toBeInTheDocument();
  });

  it("should render all main sections", () => {
    const { container } = render(<MovieDetail movie={mockMovie} />);

    // Check for hero section
    expect(container.querySelector('[class*="hero"]')).toBeInTheDocument();

    // Check for content section
    expect(container.querySelector('[class*="content"]')).toBeInTheDocument();

    // Check for trailers section
    expect(container.querySelector('[class*="trailers"]')).toBeInTheDocument();
  });
});
