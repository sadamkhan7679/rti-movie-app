import { Movie } from "@/types/movies/movie.types";
import { MovieCard } from "@/components/modules/home/movie-card";
import styles from "./styles.module.css";

type MoviesListProps = {
  moviesList: Movie[];
};

export const MoviesList = ({ moviesList }: MoviesListProps) => {
  // console.log({ moviesList });

  return (
    <div className={styles.moviesGrid}>
      {moviesList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
