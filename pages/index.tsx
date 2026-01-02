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


  const [authorized, setAuthorized] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [error, setError] = useState('');

  const checkAccess = async () => {
    setError(''); // Limpia el error al intentar de nuevo
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: inputPin })
      });
      
      if (res.ok) {
        setAuthorized(true);
        sessionStorage.setItem('is_locked', 'false');
      } else {
        // Si el status es 401 o 400, mostramos el error
        setError("PIN incorrecto. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  // Revisa si ya puso el pin antes en esta sesión
  useEffect(() => {
    if (sessionStorage.getItem('is_locked') === 'false') setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
        {/* Círculos de fondo decorativos para el efecto glass */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
  
        <div className="relative w-full max-w-sm p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-zinc-800 rounded-2xl mb-4 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Acceso Privado</h2>
            <p className="text-zinc-400 text-sm mt-2 text-center">Introduce el PIN para desbloquear el catálogo familiar.</p>
          </div>
  
          <div className="space-y-4">
            <input 
              type="password" 
              maxLength={6}
              onChange={(e) => setInputPin(e.target.value)} 
              placeholder="••••••"
              className="w-full bg-zinc-800/50 border border-zinc-700 text-white text-center text-2xl tracking-[1em] rounded-xl py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
            />
            
            <button 
              onClick={checkAccess}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all duration-200"
            >
              Desbloquear
            </button>
  
            {error && (
              <div className="animate-shake mt-4 py-2 px-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-xs text-center font-medium">{error}</p>
              </div>
            )}
          </div>
        
        </div>
      </div>
    );
  }

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
