import React, { useEffect, useReducer, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../components/Card/Card";
import CardTvShow from "../../components/CardTvShow/CardTvShow";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Navbar from "../../components/Navbar/Navbar";
import UseFetchMovies from "../../hooks/UseFetchMovie";
import UseFetchTvShow from "../../hooks/UseFetchTvShow";

const Home = () => {
  const { movies, hasMoreMovie, fetchMoreMovies } = UseFetchMovies();
  const { tvShows, hasMoreTvShow, fetchMoreTvShows } = UseFetchTvShow();

  useEffect(() => {
    if (movies.length === 0) {
      fetchMoreMovies();
    }
    if (tvShows.length === 0) {
      fetchMoreTvShows();
    }
  }, [movies.length, tvShows.length]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <HeroBanner />
      <InfiniteScroll
        className="pl-14 flex gap-6 flex-wrap"
        dataLength={movies.length} //This is important field to render the next data
        next={fetchMoreMovies}
        hasMore={hasMoreMovie}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {movies.map((el, i) => (
          <Card key={i} name={el.name} id={el._id} />
        ))}
      </InfiniteScroll>
      <InfiniteScroll
        className="pl-14 flex gap-6 flex-wrap"
        dataLength={tvShows.length} //This is important field to render the next data
        next={fetchMoreTvShows}
        hasMore={hasMoreTvShow}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {tvShows.map((el, i) => (
          <CardTvShow key={i} name={el.name} seasons={el.seasons} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
