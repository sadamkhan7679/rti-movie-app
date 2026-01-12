"use server";

import { Movie } from "@/types/movies/movie.types";
import { ApiResponse } from "@/types/root/actions/actions.types";
import { TMDB_API_KEY, TMDB_API_URL } from "@/constants/env";

export async function fetchPopularMovies(): Promise<ApiResponse<Movie[]>> {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }

    const data = await response.json();

    return {
      success: true,
      data: data.results,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function fetchMovieById(id: number): Promise<ApiResponse<Movie>> {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    );

    if (!response.ok) {
      return {
        success: false,
        error: "Movie not found",
      };
    }

    const movie = await response.json();

    if (!movie) {
      return {
        success: false,
        error: "Movie not found",
      };
    }

    return {
      success: true,
      data: movie,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
