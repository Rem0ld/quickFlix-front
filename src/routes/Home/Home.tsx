import { Carousel } from "antd";
import React, { useEffect, useReducer, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Card from "../../components/Card/Card";
import CardTvShow from "../../components/CardTvShow/CardTvShow";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Navbar from "../../components/Navbar/Navbar";
import { TestCard } from "../../components/TestCard/TestCard";
import {
  initialStateDetailsVideo,
  setVideo,
} from "../../features/video/videoSlice";
import { initialStateVideo } from "../../hooks/ReducerVideo";
import UseFetchMovies from "../../hooks/UseFetchMovie";
import UseFetchTvShow from "../../hooks/UseFetchTvShow";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, hasMoreMovie, fetchMoreMovies } = UseFetchMovies();
  const { tvShows, hasMoreTvShow, fetchMoreTvShows } = UseFetchTvShow();
  const [offset, setOffset] = useState(0);
  const [max, setMax] = useState(5);

  useEffect(() => {
    dispatch(setVideo(initialStateDetailsVideo));
  }, []);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMoreMovies();
    }
    if (tvShows.length === 0) {
      fetchMoreTvShows();
    }
  }, [movies.length, tvShows.length]);

  return (
    <>
      {/* <TestCard /> */}
      <div className="h-32" />
      <InfiniteScroll
        className="px-5 flex gap-6 flex-wrap"
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
        {movies.map((el, i) => {
          return <Card key={i} {...el} />;
        })}
      </InfiniteScroll>
      {/* <InfiniteScroll
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
          <CardTvShow
            key={i}
            name={el.name}
            seasons={el.seasons}
            posterPath={el.posterPath ? el.posterPath[0] : ""}
          />
        ))}
      </InfiniteScroll> */}
    </>
  );
};

export default Home;
