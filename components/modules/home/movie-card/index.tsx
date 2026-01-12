import React from "react";
import { Movie } from "@/types/movies/movie.types";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { getMoviePosterUrl } from "@/lib/utils";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className={styles.card}>
      <Image
        src={getMoviePosterUrl({ path: movie.poster_path })}
        alt={movie.title}
        className={styles.poster}
        width={200}
        height={300}
      />
    </Link>
  );
}
