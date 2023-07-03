import Head from "next/head";
import Layout from "./Layout";
import Container from "./Container";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Card from "./CardItem";
import { useSearch } from "../hooks/useSearch";
import { useMovies } from "../hooks/useMovies";
import debounce from "just-debounce-it";

type Movie = {
  id: string | number;
  title: string;
  poster: string;
};

type Loading = boolean;

type Props = {
  movies: Movie[];
  loading: Loading;
};

const Result: React.FC<Props> = ({ movies, loading }) => {
  const router = useRouter();

  return (
    <div className="result-wrap">
      <h2 className="text-2xl font-bold tracking-tight leading-tight my-2 text-white">
        Resultados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-8">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          movies.flatMap((movie, i) => (
            <Card
              id={movie.id}
              title={movie.title}
              key={movie.id}
              poster={
                movie.poster !== null
                  ? `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster}`
                  : "/wlogo.png"
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Result;
