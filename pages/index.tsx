import { CMS_NAME } from "../lib/constants";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import Container from "../components/Container";
import Head from "next/head";

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
  };
};

export default function ListItems({ movies }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME} - Estrenos ${new Date().getFullYear()}`}</title>
        </Head>
        <Container>
          {movies.top.length > 0 ? (
            <SliderBox movies={movies.top} title={"Top Estrenos"} />
          ) : (
            <p className="flex justify-center items-center text-2xl">
              Cargando...
            </p>
          )}
          {movies.netflix.length > 0 ? (
            <SliderBox movies={movies.netflix} title={"Netflix Estrenos"} />
          ) : (
            <p className="flex justify-center items-center text-2xl">
              Cargando...
            </p>
          )}
          {movies.hbo.length > 0 ? (
            <SliderBox movies={movies.hbo} title={"HBO Max Estrenos"} />
          ) : (
            <p className="flex justify-center items-center text-2xl">
              Cargando...
            </p>
          )}
          {movies.disney.length > 0 ? (
            <SliderBox movies={movies.disney} title={"Disney Estrenos"} />
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
  const [nowPlayingRes, netflixMovies, hboMovies, disneyMovies] =
    await Promise.all([
      fetch(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX"
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
    ]);

  const orderMovies = (items) => {
    return items.sort(function (x, y) {
      var firstDate = new Date(x.release),
        SecondDate = new Date(y.release);

      if (firstDate > SecondDate) return -1;
      if (firstDate < SecondDate) return 1;
      return 0;
    });
  };

  const nowPlayingData = await nowPlayingRes.json();
  //const popularData = await popularRes.json();
  const disneyData = await disneyMovies.json();
  const netflixData = await netflixMovies.json();
  const hboData = await hboMovies.json();

  const nowPlayingMovies: Movie[] = nowPlayingData.results.map(
    (movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      release: movie.release_date,
      rate: movie.vote_average,
    })
  );

  const orderedNowMovies: Movie[] = orderMovies(nowPlayingMovies);
  const nowMoviesFinal = orderedNowMovies.filter((v) => v.rate >= 5);

  /*const popularMovies: Movie[] = popularData.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    release: movie.release_date,
    rate: movie.vote_average,
  }));*/

  //const orderedPopularMovies: Movie[] = orderMovies(popularMovies);
  //const popularMoviesFinal = orderedPopularMovies.filter((v) => v.rate >= 5);

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

  return {
    props: {
      movies: {
        top: [...nowMoviesFinal],
        netflix: [...netflixMoviesData],
        hbo: [...hboMoviesData],
        disney: [...disneyMoviesData],
      },
    },
  };
};
