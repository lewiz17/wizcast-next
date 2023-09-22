import { Ref, useEffect, useRef, useState } from "react";
import { formatRate, formatTitle } from "../utils/helpers";
import Rating from "./Rating";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StarIcon } from "./Icons";

type Movie = {
  id: string | number;
  title: string;
  poster: string;
  rate: number;
  release: string;
};

type Serie = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  poster: string;
  title: string;
  rate: number;
};

type Relates = {
  moviesRelates: Array<{
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
  }>;
};

type Props = {
  movies?: Movie[];
  title: string;
  relates?: Relates;
  series?: Serie[];
};

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  lazyload: "ondemand",
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        infinite: true,
      },
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 4,
        dots: true,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 479,
      settings: "unslick",
    },
  ],
};

const SliderBox = ({ movies, series, relates, title }: Props) => {
  return (
    <div className="flex flex-col relative mt-5">
      {movies && (
        <h2 className="text-2xl xs:px-[3%] font-bold text-white tracking-tight leading-tight mt-3">
          {title}
        </h2>
      )}
      {relates && relates.moviesRelates.length > 6 && (
        <h2 className="text-2xl xs:px-[3%] font-bold text-white tracking-tight leading-tight mt-3">
          {title}
        </h2>
      )}
      {series && (
        <h2 className="text-2xl xs:px-[3%] font-bold text-white tracking-tight leading-tight mt-3">
          {title}
        </h2>
      )}
      <div className="container mx-auto">
        <Slider
          {...settings}
          className="flex flex-wrap gap-y-[10px] xs:px-[3%]"
        >
          {relates &&
            relates.moviesRelates.length > 6 &&
            relates.moviesRelates.map(
              (
                { id, title, poster_path, vote_average, release_date },
                index
              ) => (
                <div
                  key={index}
                  className="item-movie w-[200px] xs:w-[50%] xs:p-[0px] flex flex-col  pt-2 pr-3 hover:opacity-50"
                >
                  <Link href={`/movie/${id}/${formatTitle(title)}`}>
                    <img
                      src={
                        poster_path !== null
                          ? `https://www.themoviedb.org/t/p/w500${poster_path}`
                          : "/wlogo.png"
                      }
                      alt={title}
                      width="220"
                      height="270"
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </Link>
                  <span className="text-white text-[12px]">
                    {title} - {release_date.split("-")[0]}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <StarIcon /> {formatRate(vote_average)}
                  </span>
                </div>
              )
            )}
          {movies &&
            movies.map(({ id, title, poster, rate, release }, index) => (
              <div
                key={index}
                className="item-movie w-[200px] xs:w-[50%] xs:p-[0px] flex flex-col pr-3 hover:opacity-50 pt-2"
              >
                <Link href={`/movie/${id}/${formatTitle(title)}`}>
                  <img
                    src={
                      poster !== null
                        ? `https://www.themoviedb.org/t/p/w500${poster}`
                        : "/wlogo.png"
                    }
                    alt={title}
                    width="220"
                    height="270"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </Link>
                <span className="text-white text-[12px]">
                  {title} - {release.split("-")[0]}
                </span>
                <span
                  style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <StarIcon /> {formatRate(rate)}
                </span>
              </div>
            ))}

          {series &&
            series.map(({ id, title, poster, rate }, index) => (
              <div
                key={index}
                className="item-movie w-[200px] xs:w-[50%] xs:p-[0px] flex flex-col pr-3 hover:opacity-50 pt-2"
              >
                <Link href={`/serie/${id}/${formatTitle(title)}`}>
                  <img
                    src={
                      poster !== null
                        ? `https://www.themoviedb.org/t/p/w500${poster}`
                        : "/wlogo.png"
                    }
                    alt={title}
                    width="220"
                    height="270"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </Link>
                <span className="text-white text-[12px]">{title}</span>
                <span
                  style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <StarIcon /> {formatRate(rate)}
                </span>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderBox;
