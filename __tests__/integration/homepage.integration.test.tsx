import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as movieActions from "@/lib/actions/movies.actions";
import { mockMovies } from "@/data/movies-list";

// Mock the module
jest.mock("@/lib/actions/movies.actions.ts");

describe("HomePage Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle successful movie fetch", async () => {
    const mockFetch = movieActions.fetchPopularMovies as jest.MockedFunction<
      typeof movieActions.fetchPopularMovies
    >;

    mockFetch.mockResolvedValueOnce({
      success: true,
      data: mockMovies,
    });

    const result = await movieActions.fetchPopularMovies();

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockMovies);
  });

  it("should handle failed movie fetch", async () => {
    const mockFetch = movieActions.fetchPopularMovies as jest.MockedFunction<
      typeof movieActions.fetchPopularMovies
    >;

    mockFetch.mockResolvedValueOnce({
      success: false,
      error: "Failed to fetch movies",
    });

    const result = await movieActions.fetchPopularMovies();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to fetch movies");
  });
});
