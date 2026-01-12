import { MoviesList } from "@/components/modules/home/movies-list";
import { Header } from "@/components/shared/header";
import { MovieGridSkeleton } from "@/components/shared/skeletons/movies-grid";
import { Suspense } from "react";
import { ErrorMessage } from "@/components/shared/error-message";
import { fetchPopularMovies } from "@/lib/actions/movies.actions";

async function MoviesContent() {
  const response = await fetchPopularMovies();

  if (!response.success || !response.data) {
    return (
      <ErrorMessage
        message={
          response.error || "Failed to load movies. Please try again later."
        }
      />
    );
  }

  return <MoviesList moviesList={response.data} />;
}

export default async function HomePage() {
  return (
    <main className="main main--dark">
      <Header title="Pop Movies" showMenu={true} />
      <Suspense fallback={<MovieGridSkeleton />}>
        <MoviesContent />
      </Suspense>
    </main>
  );
}
