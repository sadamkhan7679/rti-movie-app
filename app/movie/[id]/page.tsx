import { notFound } from "next/navigation";
import { Header } from "@/components/shared/header";
import { MovieDetail } from "@/components/modules/movie-details";
import { fetchMovieById } from "@/lib/actions/movies.actions";
import { ErrorMessage } from "@/components/shared/error-message";
import { Suspense } from "react";
import { MovieDetailSkeleton } from "@/components/shared/skeletons/movie-detail";

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function MovieContent({ movieId }: { movieId: number }) {
  const response = await fetchMovieById(movieId);

  if (!response.success) {
    if (response.error === "Movie not found") {
      notFound();
    }

    return (
      <ErrorMessage
        message={
          response.error ||
          "Failed to load movie details. Please try again later."
        }
      />
    );
  }

  if (!response.data) {
    notFound();
  }

  return <MovieDetail movie={response.data} />;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    notFound();
  }

  return (
    <main className="main main--light">
      <Header title="Movie details" showBackButton={true} showMenu={true} />
      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieContent movieId={Number(id)} />
      </Suspense>
    </main>
  );
}
