import { CMS_NAME } from "../lib/constants";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import Container from "../components/Container";
import Head from "next/head";
import { StarIcon } from "../components/Icons";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Layout = dynamic(() => import("../components/Layout"), {
  loading: () => <p>Cargando...</p>,
});

const SliderBox = dynamic(() => import("../components/SliderBox"), {
  loading: () => <p>Cargando...</p>,
});

type Movie = {
  id: number;
  title: string;
  poster: string;
  release: number;
  rate: number;
  poster_path: string;
  release_date: number;
  vote_average: number;
};

type Props = {
  movies: {
    top: Movie[];
    netflix: Movie[];
    hbo: Movie[];
    disney: Movie[];
    prime: Movie[];
  };
};

export default function ListItems({ movies }: Props) {
  const TIMES = [10, 20, 30, 15, 25, 35, 5];
  const OPTIONS = ["vote", "donate"];
  const [currentTime, setCurrentTime] = useState(0);
  const [currentOption, setCurrentOption] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(Math.floor(Math.random() * TIMES.length));
      setCurrentOption(Math.floor(Math.random() * OPTIONS.length));

      if (OPTIONS[currentOption] == "donate") {
        toast("Alguien hizo un aporte a WZP", {
          icon: "👏",
        });
      } else {
        toast("Alguien dió su voto en WZP", {
          icon: "🔥",
        });
      }
    }, TIMES[currentTime] * 1000);
    return () => clearInterval(interval);
  }, [currentTime, currentOption]);

  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME} - Estrenos ${new Date().getFullYear()}`}</title>
        </Head>
        <Container>
          <details className="text-[12px] container mt-20 flex justify-center text-2xl text-white font-bold mx-auto">
            <summary className="animate-bounce">
              <StarIcon /> Vota por la nueva funcionalidad del portal:{" "}
              <span>Leer más &rarr;</span>
            </summary>
            <p>
              Hola amigos, gracias por visitar nuestra plataforma, estamos
              trabajando para mejorar algunas secciones de la plataforma, Nos
              gustaria que fueras parte del proceso dándonos tu opinión o
              votando por tu funcionalidad favorita, Entra ahora y vota: <br />
              <a
                href="https://forms.gle/r2vTNzPrnkAo5Gjr5"
                target="blank_"
                className="my-1 inline-block text-black font-bold bg-white rounded-full py-2 px-4 hover:opacity-[0.8]"
              >
                Ir a votar
              </a>
            </p>
          </details>
          {movies.top.length > 0 ? (
            <SliderBox movies={movies.top} title={"Top Estrenos"} />
          ) : (
            <p className="flex justify-center items-center text-2xl h-[200px]">
              Cargando...
            </p>
          )}
          {movies.netflix.length > 0 ? (
            <SliderBox movies={movies.netflix} title={"Netflix Peliculas"} />
          ) : (
            <p className="flex justify-center items-center text-2xl">
              Cargando...
            </p>
          )}
          {movies.hbo.length > 0 ? (
            <SliderBox movies={movies.hbo} title={"HBO Max Peliculas"} />
          ) : (
            <p className="flex justify-center items-center text-2xl">
              Cargando...
            </p>
          )}
          {movies.disney.length > 0 ? (
            <SliderBox movies={movies.disney} title={"Disney Peliculas"} />
          ) : (
            <p className="flex justify-center items-center text-2xl">
              Cargando...
            </p>
          )}
          {movies.prime.length > 0 ? (
            <SliderBox movies={movies.prime} title={"Amazon Prime Peliculas"} />
          ) : (
            <p className="flex justify-center items-center text-2xl">
              Cargando...
            </p>
          )}
        </Container>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [nowPlayingRes, netflixMovies, hboMovies, disneyMovies, primeMovies] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=popularity.desc&release_date.gte=2000-01-01&release_date.lte=${currentDate}`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=primary_release_date.desc&with_watch_providers=8&watch_region=CO&vote_count.gte=300&year=${new Date().getFullYear()}`
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
    ]);

  const nowPlayingData = await nowPlayingRes.json();
  const disneyData = await disneyMovies.json();
  const netflixData = await netflixMovies.json();
  const hboData = await hboMovies.json();
  const primeData = await primeMovies.json();

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

  return {
    props: {
      movies: {
        top: [...nowMoviesFinal],
        netflix: [...netflixMoviesData],
        hbo: [...hboMoviesData],
        disney: [...disneyMoviesData],
        prime: [...primeMoviesData],
      },
    },
  };
};
