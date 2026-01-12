import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as movieActions from "@/lib/actions/movies.actions";
import { Movie } from "@/types/movies/movie.types";

jest.mock("@/lib/actions/movies.actions");

describe("MovieDetailPage Integration", () => {
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and display movie details", async () => {
    const mockFetch = movieActions.fetchMovieById as jest.MockedFunction<
      typeof movieActions.fetchMovieById
    >;

    mockFetch.mockResolvedValueOnce({
      success: true,
      data: mockMovie,
    });

    const result = await movieActions.fetchMovieById(1);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockMovie);
    expect(result.data?.title).toBe("Predator: Badlands");
  });

  it("should handle movie not found", async () => {
    const mockFetch = movieActions.fetchMovieById as jest.MockedFunction<
      typeof movieActions.fetchMovieById
    >;

    mockFetch.mockResolvedValueOnce({
      success: false,
      error: "Movie not found",
    });

    const result = await movieActions.fetchMovieById(999);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Movie not found");
  });

  it("should handle network errors", async () => {
    const mockFetch = movieActions.fetchMovieById as jest.MockedFunction<
      typeof movieActions.fetchMovieById
    >;

    mockFetch.mockResolvedValueOnce({
      success: false,
      error: "Network error",
    });

    const result = await movieActions.fetchMovieById(1);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Network error");
  });
});
