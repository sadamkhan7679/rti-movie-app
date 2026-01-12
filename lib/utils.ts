export const getMoviePosterUrl = ({
  path,
  size = "w185",
}: {
  path: string;
  size?: "w92" | "w154" | "w185" | "w342" | "original";
}): string => {
  const baseUrl = "https://image.tmdb.org/t/p/";
  return `${baseUrl}${size}${path}`;
};

export const getMovieRating = (voteAverage: number): string => {
  return voteAverage.toFixed(1);
};

export const getMovieYear = (releaseDate: string): string => {
  const date = new Date(releaseDate);
  return date.getFullYear().toString();
};
