import UseFetchVideos from "./UseFetchVideos";

/**
 * Call fetchMore to get the request to work
 * @returns
 */
export default function UseFetchMovies() {
  const { videos, hasMore, fetchMore, errors, refetch } = UseFetchVideos({
    type: "movie",
  });

  return {
    movies: videos,
    hasMoreMovies: hasMore,
    refetchMovies: refetch,
    errorsMovies: errors,
    fetchMoreMovies: fetchMore,
  };
}
