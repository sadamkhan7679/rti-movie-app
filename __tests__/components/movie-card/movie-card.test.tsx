import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Movie } from "@/types/movies/movie.types";
import { MovieCard } from "@/components/modules/home/movie-card";

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

describe("MovieCard", () => {
  it("should render movie poster with correct src", () => {
    render(<MovieCard movie={mockMovie} />);

    const img = screen.getByAltText(mockMovie.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      expect(img.getAttribute("src")).toContain(
        encodeURIComponent(mockMovie.poster_path),
      ),
    );
  });

  it("should render movie poster with alt text", () => {
    render(<MovieCard movie={mockMovie} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", mockMovie.title);
  });

  it("should link to correct movie detail page", () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1242898");
  });

  it("should be accessible", () => {
    const { container } = render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("link");
    const img = screen.getByRole("img");

    expect(link).toBeInTheDocument();
    expect(img).toHaveAccessibleName(mockMovie.title);
  });

  it("should handle different movie IDs correctly", () => {
    const movie2 = { ...mockMovie, id: 42, title: "Another Movie" };
    render(<MovieCard movie={movie2} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/42");
  });
});
