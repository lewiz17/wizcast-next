import { Ref, useEffect, useRef, useState } from "react";
import { formatTitle } from "../utils/helpers";
import Rating from "./Rating";
import Link from "next/link";
import Image from "next/image";

type Movie = {
  id: string | number;
  title: string;
  poster: string;
  rate: number;
};

type Props = {
  movies: Movie[];
  title: string;
};

const SliderBox = ({ movies, title }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollLeftHandler = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;

      if (direction === "left") {
        const newScrollLeft = scrollLeft - containerWidth;
        setScrollLeft(
          newScrollLeft < 0 ? scrollWidth - containerWidth : newScrollLeft
        );
      } else if (direction === "right") {
        const newScrollLeft = scrollLeft + containerWidth;
        setScrollLeft(newScrollLeft >= scrollWidth ? 0 : newScrollLeft);
      }
    }
  };

  return (
    <div className="flex flex-col relative">
      <h2 className="text-2xl font-bold text-white tracking-tight leading-tight mt-3">
        {title}
      </h2>

      <div className="w-full relative">
        <div className="w-full absolute h-full">
          <button
            className="absolute inset-y-0 left-[-8rem] z-20 overlay-toleft w-20 flex justify-center items-center"
            onClick={() => scrollLeftHandler("left")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
              className="w-6 h-6 text-gray-800 dark:text-white"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
              />
            </svg>
          </button>
          <button
            className="absolute inset-y-0 right-[-8rem] z-20 overlay-toright w-20 flex justify-center items-center"
            onClick={() => scrollLeftHandler("right")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
              className="w-6 h-6 text-gray-800 dark:text-white"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </button>
        </div>
        <div className="pt-4 z-10overflow-hidden">
          <div
            className="flex overflow-x-visible space-x-4 transition-transform duration-500"
            ref={containerRef}
            style={{ transform: `translateX(-${scrollLeft}px)` }}
          >
            {movies.map(({ id, title, poster, rate }, index) => (
              <div
                key={index}
                className="item-movie flex-shrink-0 bg-gray-200 flex flex-col items-center justify-center relative "
              >
                <Rating rate={rate} />
                <Link
                  href={`/movie/${id}/${formatTitle(title)}`}
                  legacyBehavior
                >
                  <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                    <Image
                      src={
                        poster !== null
                          ? `https://www.themoviedb.org/t/p/w500${poster}`
                          : "/wlogo.png"
                      }
                      alt={title}
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="w-full h-auto"
                      priority
                    />
                  </a>
                </Link>
                <span className="title-hover">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderBox;
