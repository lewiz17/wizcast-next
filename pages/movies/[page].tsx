import { CMS_NAME } from "../../lib/constants";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import Container from "../../components/Container";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Layout = dynamic(() => import("../../components/Layout"), {
  loading: () => <p>Cargando...</p>,
});

const SliderBox = dynamic(() => import("../../components/SliderBox"), {
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
    page: string | string[];
  };
};

export default function ListItems({ movies }: Props) {
  const [showPaginate, setShowPaginate] = useState(false);

  useEffect(() => {
    setShowPaginate(true);
  }, [movies.page]);

  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME} - Estrenos ${new Date().getFullYear()}`}</title>
        </Head>
        <Container>
          <h4 className="mt-[4rem] flex gap-[10px] justify-center items-center">
            WizPelis - Pagina {movies.page}
          </h4>
          {showPaginate && (
            <div className="paginator">
              <ul className="paginate-wrap">
                {new Array(5).fill("").map((v, i) => {
                  return (
                    <li
                      className={`page-item ${
                        i + 1 == Number(movies.page) ? "active" : ""
                      }`}
                      key={i + 1}
                    >
                      <Link href={`/movies/${i + 1}`}>{i + 1}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {movies.top.length > 0 ? (
            <SliderBox movies={movies.top} title={"Top Estrenos"} />
          ) : (
            ""
          )}
          {movies.netflix.length > 6 ? (
            <SliderBox movies={movies.netflix} title={"Netflix Peliculas"} />
          ) : (
            ""
          )}
          {movies.hbo.length > 6 ? (
            <SliderBox movies={movies.hbo} title={"HBO Max Peliculas"} />
          ) : (
            ""
          )}
          {movies.disney.length > 6 ? (
            <SliderBox movies={movies.disney} title={"Disney Peliculas"} />
          ) : (
            ""
          )}
          {movies.prime.length > 6 ? (
            <SliderBox movies={movies.prime} title={"Amazon Prime Peliculas"} />
          ) : (
            ""
          )}
          {showPaginate && (
            <div className="paginator">
              <ul className="paginate-wrap">
                {new Array(5).fill("").map((v, i) => {
                  return i + 1 == 1 ? (
                    <li
                      className={`page-item ${
                        i + 1 == Number(movies.page) ? "active" : ""
                      }`}
                      key={i + 1}
                    >
                      <Link href={`/`}>{i + 1}</Link>
                    </li>
                  ) : (
                    <li
                      className={`page-item ${
                        i + 1 == Number(movies.page) ? "active" : ""
                      }`}
                      key={i + 1}
                    >
                      <Link href={`/movies/${i + 1}`}>{i + 1}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Container>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page } = context.params!;

  const currentDate = new Date().toISOString().split("T")[0];
  const [nowPlayingRes, netflixMovies, hboMovies, disneyMovies, primeMovies] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=popularity.desc&release_date.gte=2000-01-01&release_date.lte=${currentDate}&page=${page}`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=popularity.desc&with_watch_providers=8&watch_region=CO&vote_average.lte=100&year=${new Date().getFullYear()}&page=${page}`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=popularity.desc&with_watch_providers=384&watch_region=CO&vote_count.gte=300&year=${new Date().getFullYear()}&page=${page}`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=popularity.desc&with_watch_providers=337&watch_region=CO&vote_count.gte=300&year=${new Date().getFullYear()}&page=${page}`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&sort_by=popularity.desc&with_watch_providers=119&watch_region=CO&vote_count.gte=300&year=${new Date().getFullYear()}&page=${page}`
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
        page: page,
      },
    },
  };
};
