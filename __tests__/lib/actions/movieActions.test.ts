// __tests__/lib/actions/movieActions.test.ts

import {
  fetchPopularMovies,
  fetchMovieById,
} from "@/lib/actions/movies.actions";

// Mock fetch globally
global.fetch = jest.fn();

describe("movieActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchPopularMovies", () => {
    it("should return paginated movies successfully", async () => {
      const mockResponse = {
        results: [
          {
            id: 1,
            title: "Test Movie 1",
            poster_path: "/test1.jpg",
            overview: "Test overview 1",
            vote_average: 8.5,
            release_date: "2023-01-01",
            runtime: 120,
          },
          {
            id: 2,
            title: "Test Movie 2",
            poster_path: "/test2.jpg",
            overview: "Test overview 2",
            vote_average: 7.5,
            release_date: "2023-02-01",
            runtime: 110,
          },
        ],
        page: 1,
        total_pages: 10,
        total_results: 100,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await fetchPopularMovies();

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data).toHaveLength(2);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/movie/popular"),
        expect.any(Object),
      );
    });

    it("should return movies with correct structure", async () => {
      const mockResponse = {
        results: [
          {
            id: 1,
            title: "Test Movie",
            poster_path: "/test.jpg",
            overview: "Test overview",
            vote_average: 8.5,
            release_date: "2023-01-01",
            runtime: 120,
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await fetchPopularMovies();

      expect(response.data?.[0]).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        overview: expect.any(String),
        vote_average: expect.any(Number),
        release_date: expect.any(String),
      });
    });

    it("should handle API errors gracefully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const response = await fetchPopularMovies();

      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
      expect(response.data).toBeUndefined();
    });

    it("should handle network errors gracefully", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error"),
      );

      const response = await fetchPopularMovies();

      expect(response.success).toBe(false);
      expect(response.error).toBe("Network error");
      expect(response.data).toBeUndefined();
    });
  });

  describe("fetchMovieById", () => {
    it("should return a movie by valid id", async () => {
      const mockMovie = {
        id: 1,
        title: "Mad Max: Fury Road",
        poster_path: "/test.jpg",
        overview: "Test overview",
        vote_average: 8.5,
        release_date: "2015-05-15",
        runtime: 120,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMovie,
      });

      const response = await fetchMovieById(1);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data?.id).toBe(1);
      expect(response.data?.title).toBe("Mad Max: Fury Road");
    });

    it("should return error for invalid id", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const response = await fetchMovieById(999999);

      expect(response.success).toBe(false);
      expect(response.error).toBe("Movie not found");
      expect(response.data).toBeUndefined();
    });

    it("should return movie with all required fields", async () => {
      const mockMovie = {
        id: 1,
        title: "Test Movie",
        poster_path: "/test.jpg",
        overview: "Test overview",
        vote_average: 8.5,
        release_date: "2023-01-01",
        runtime: 120,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMovie,
      });

      const response = await fetchMovieById(1);

      expect(response.data).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        overview: expect.any(String),
        vote_average: expect.any(Number),
        release_date: expect.any(String),
      });
    });

    it("should handle network errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Connection timeout"),
      );

      const response = await fetchMovieById(1);

      expect(response.success).toBe(false);
      expect(response.error).toBe("Connection timeout");
    });
  });
});
