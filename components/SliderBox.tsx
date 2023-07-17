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
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  lazyload: "ondemand",
};

const SliderBox = ({ movies, relates, title }: Props) => {
  return (
    <div className="flex flex-col relative mt-5">
      {movies && (
        <h2 className="text-2xl font-bold text-white tracking-tight leading-tight mt-3">
          {title}
        </h2>
      )}
      {relates && relates.moviesRelates.length > 6 && (
        <h2 className="text-2xl font-bold text-white tracking-tight leading-tight mt-3">
          {title}
        </h2>
      )}
      <div className="container mx-auto">
        <Slider {...settings}>
          {relates &&
            relates.moviesRelates.length > 6 &&
            relates.moviesRelates.map(
              ({ id, title, poster_path, vote_average }, index) => (
                <div
                  key={index}
                  className="item-movie w-[200px] flex pt-2 pr-3 hover:opacity-50"
                >
                  <Link href={`/movie/${id}/${formatTitle(title)}`}>
                    <Image
                      src={
                        poster_path !== null
                          ? `https://www.themoviedb.org/t/p/w500${poster_path}`
                          : "/wlogo.png"
                      }
                      alt={title}
                      width="220"
                      height="270"
                      sizes="100vw"
                      className="w-full h-auto"
                      priority
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
                    <StarIcon /> {formatRate(vote_average)}
                  </span>
                </div>
              )
            )}
          {movies &&
            movies.map(({ id, title, poster, rate }, index) => (
              <div
                key={index}
                className="item-movie w-[200px] flex pr-3 hover:opacity-50 pt-2"
              >
                <Link href={`/movie/${id}/${formatTitle(title)}`}>
                  <Image
                    src={
                      poster !== null
                        ? `https://www.themoviedb.org/t/p/w500${poster}`
                        : "/wlogo.png"
                    }
                    alt={title}
                    width="220"
                    height="270"
                    sizes="100vw"
                    className="w-full h-auto"
                    priority
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
