import React from "react";
import { Movie } from "@/types/movies/movie.types";
import styles from "./styles.module.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getMoviePosterUrl, getMovieRating, getMovieYear } from "@/lib/utils";
import { PlayIcon } from "@/icons/movies/play.icon";

interface MovieDetailProps {
  movie: Movie;
}

export const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>{movie.title}</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.posterSection}>
          <div className={styles.imageContainer}>
            <Image
              src={getMoviePosterUrl({ path: movie.poster_path })}
              alt={movie.title}
              className={styles.poster}
              fill
            />
          </div>
          <div className={styles.infoSection}>
            <div className={styles.yearRuntime}>
              <span className={styles.year}>
                {getMovieYear(movie.release_date)}
              </span>
              {/*{movie.runtime && (*/}
              {/*  <span className={styles.runtime}>{movie.runtime} mins</span>*/}
              {/*)}*/}
            </div>

            <div>
              <div className={styles.rating}>
                <span className={styles.ratingValue}>
                  {getMovieRating(movie.vote_average)}
                </span>
              </div>
              <Button variant="secondary" className={styles.favoriteButton}>
                Add to Favorite
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.overview}>
          <p className={styles.overviewText}>{movie.overview}</p>
        </div>

        <div className={styles.trailers}>
          <h3 className={styles.trailersTitle}>TRAILERS</h3>

          <button className={styles.trailerButton}>
            <div className={styles.playIcon}>
              <PlayIcon />
            </div>
            <span className={styles.trailerText}>Play trailer 1</span>
          </button>

          <button className={styles.trailerButton}>
            <div className={styles.playIcon}>
              <PlayIcon />
            </div>
            <span className={styles.trailerText}>Play trailer 2</span>
          </button>
        </div>
      </div>
    </div>
  );
};
