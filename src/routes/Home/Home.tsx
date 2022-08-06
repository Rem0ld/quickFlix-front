import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import Card from "../../components/Card/Card";
import CardTvShow from "../../components/CardTvShow/CardTvShow";
import {
  initialStateDetailsTvShow,
  setTvShow,
} from "../../features/tvShow/tvShowSlice";
import {
  initialStateDetailsVideo,
  setVideo,
} from "../../features/video/videoSlice";
import UseFetchMovies from "../../hooks/UseFetchMovie";
import UseFetchTvShow from "../../hooks/UseFetchTvShow";
import { Video, Watched } from "../../types";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, hasMoreMovies, fetchMoreMovies } = UseFetchMovies();
  const { tvShows, hasMoreTvShows, fetchMoreTvShows } = UseFetchTvShow();

  useEffect(() => {
    dispatch(setVideo(initialStateDetailsVideo));
    dispatch(setTvShow(initialStateDetailsTvShow));
  }, []);

  return (
    <>
      {/* <TestCard /> */}
      <div className="h-32" />
      <InfiniteScroll
        className="px-5 flex justify-evenly gap-6 flex-wrap mb-6"
        dataLength={movies.length} //This is important field to render the next data
        next={fetchMoreMovies}
        hasMore={hasMoreMovies}
        loader={<h4>Loading...</h4>}
      >
        {movies.map((el: Video, i) => {
          return <Card key={i} {...el} />;
        })}
      </InfiniteScroll>
      <InfiniteScroll
        className="px-5 flex justify-evenly gap-6 flex-wrap"
        dataLength={tvShows.length} //This is important field to render the next data
        next={fetchMoreTvShows}
        hasMore={hasMoreTvShows}
        loader={<h4>Loading...</h4>}
      >
        {tvShows.map((el, i) => (
          <React.Fragment key={i}>
            <CardTvShow {...el} />
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Home;
