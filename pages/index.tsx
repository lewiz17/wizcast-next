import { CMS_NAME } from "../lib/constants";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import Container from "../components/Container";
import Head from "next/head";
import { StarIcon } from "../components/Icons";
import Link from "next/link";
import { ModalProvider } from "../components/ModalContext";
import Paginator from "../components/Paginator";
import { SkeletonCard } from "../components/SkeletonCard";
import Tabber from "../components/Tabber";
import { getGames } from "./api/games.json";
import GamesHub from "../components/Games";
import generateRssFeed from "../utils/feed";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout = dynamic(() => import("../components/Layout"), {
  loading: () => <SkeletonCard />,
});

const SliderBox = dynamic(() => import("../components/SliderBox"), {
  loading: () => <SkeletonCard />,
});

type Movie = {
  id: number;
  title: string;
  poster: string;
  release: string;
  rate: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

type Props = {
  movies: {
    top: Movie[];
    netflix: Movie[];
    hbo: Movie[];
    disney: Movie[];
    prime: Movie[];
    paramount: Movie[];
  };
};

export default function ListItems({ movies }: Props) {
  const router = useRouter();

  const tabsPlatform = [
    {
      label: "Netflix",
      content:
        movies.netflix.length > 0 ? (
          <SliderBox movies={movies.netflix} />
        ) : (
          <SkeletonCard />
        ),
    },
    {
      label: "HBO Max",
      content:
        movies.hbo.length > 0 ? (
          <SliderBox movies={movies.hbo} />
        ) : (
          <SkeletonCard />
        ),
    },
    {
      label: "Prime",
      content:
        movies.prime.length > 6 ? (
          <SliderBox movies={movies.prime} />
        ) : (
          <SkeletonCard />
        ),
    },
    {
      label: "Disney +",
      content:
        movies.disney.length > 0 ? (
          <SliderBox movies={movies.disney} />
        ) : (
          <SkeletonCard />
        ),
    },
    {
      label: "Paramount +",
      content:
        movies.paramount.length > 0 ? (
          <SliderBox movies={movies.paramount} />
        ) : (
          <SkeletonCard />
        ),
    },
  ];

  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME} - Estrenos ${new Date().getFullYear()}`}</title>
        </Head>

        <Container>
          <h4 className="mt-[4rem] flex gap-[10px] justify-center items-center">
            Toda la info de las mejores Peliculas y Series, en las diferentes
            plataformas de streaming.
          </h4>

          {movies.top.length > 0 ? (
            <SliderBox movies={movies.top} title={"Top Estrenos"} />
          ) : (
            <SkeletonCard />
          )}
          <Paginator />
          <Tabber tabs={tabsPlatform} page={"index"} />
        </Container>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [
    nowPlayingRes,
    netflixMovies,
    hboMovies,
    disneyMovies,
    primeMovies,
    paramountMovies,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=popularity.desc&release_date.gte=2000-01-01&release_date.lte=${currentDate}`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=popularity.desc&with_watch_providers=8&watch_region=CO&vote_average.lte=100&year=${new Date().getFullYear()}`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=primary_release_date.desc&with_watch_providers=384&watch_region=CO&vote_count.gte=300&year=${new Date().getFullYear()}`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=primary_release_date.desc&with_watch_providers=337&watch_region=CO&vote_count.gte=300&year=${new Date().getFullYear()}`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=primary_release_date.desc&with_watch_providers=119&watch_region=CO&vote_count.gte=300&year=${new Date().getFullYear()}`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=primary_release_date.desc&with_watch_providers=531&watch_region=CO&vote_count.gte=300&year=${new Date().getFullYear()}`
    ),
  ]);

  const nowPlayingData = await nowPlayingRes.json();
  const disneyData = await disneyMovies.json();
  const netflixData = await netflixMovies.json();
  const hboData = await hboMovies.json();
  const primeData = await primeMovies.json();
  const paramountData = await paramountMovies.json();

  const nowPlayingMovies: Movie[] = nowPlayingData.results.map(
    (movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      release: movie.release_date,
      rate: movie.vote_average,
    })
  );

  const nowMoviesFinal = nowPlayingMovies.filter((v) => v.rate >= 6);

  const netflixMoviesData: Movie[] = netflixData.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    release: movie.release_date,
    rate: movie.vote_average,
  }));

  const hboMoviesData: Movie[] = hboData.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    release: movie.release_date,
    rate: movie.vote_average,
  }));

  const disneyMoviesData: Movie[] = disneyData.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    release: movie.release_date,
    rate: movie.vote_average,
  }));

  const primeMoviesData: Movie[] = primeData.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    release: movie.release_date,
    rate: movie.vote_average,
  }));

  const paramountMoviesData: Movie[] = paramountData.results.map(
    (movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      release: movie.release_date,
      rate: movie.vote_average,
    })
  );

  generateRssFeed();

  return {
    props: {
      movies: {
        top: [...nowMoviesFinal],
        netflix: [...netflixMoviesData],
        hbo: [...hboMoviesData],
        disney: [...disneyMoviesData],
        prime: [...primeMoviesData],
        paramount: [...paramountMoviesData],
      },
    },
  };
};
