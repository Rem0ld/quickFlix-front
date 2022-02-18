import React, {
  createContext,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ParsedMovieTime, ParsedWatchedTime, TvShow, Video } from "../../types";
import {
  makePercentage,
  secondToHours,
  secondToMinutes,
} from "../../utils/numberManipulation";

export const VideoContext = createContext<any>(null);

function VideoContextProvider({ props, children }: any) {
  const {
    id,
    name,
    posterPath,
    ytKeys,
    genres,
    year,
    resume,
    score,
    length,
    watchTime,
  } = props;

  const [percentageSeen, setPercentageSeen] = useState(0);
  const [parsedMovieLength, setParsedMovieLength] = useState<ParsedMovieTime>();
  const [parsedWatchTime, setParsedWatchTime] = useState<ParsedWatchedTime>();

  const hours = useMemo(() => secondToHours(length), [length]);
  const mins = useMemo(() => secondToMinutes(length), [length]);

  useEffect(() => {
    setParsedMovieLength({
      h: hours,
      min: mins,
    });
  }, [length, hours, mins]);

  useEffect(() => {
    if (watchTime && length) {
      setPercentageSeen(makePercentage(watchTime, length));
      setParsedWatchTime({
        mins: Math.floor(+watchTime / 60),
        total: Math.floor(+length / 60),
      });
    }
  }, [watchTime, length]);

  return (
    <VideoContext.Provider
      value={{
        id,
        name,
        posterPath,
        ytKeys,
        genres,
        year,
        resume,
        score,
        percentageSeen,
        parsedMovieLength,
        parsedWatchTime,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export default function CardWrapper(props: any) {
  const { children } = props;
  return <VideoContextProvider {...props}>{children}</VideoContextProvider>;
}
