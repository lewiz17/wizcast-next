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
    popular: Movie[];
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
          {movies.popular.length > 0 ? (
            <SliderBox movies={movies.popular} title={"Populares"} />
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
  const [nowPlayingRes, popularRes] = await Promise.all([
    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX"
    ),
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX"
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
  const popularData = await popularRes.json();

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

  const popularMovies: Movie[] = popularData.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    release: movie.release_date,
    rate: movie.vote_average,
  }));

  const orderedPopularMovies: Movie[] = orderMovies(popularMovies);
  const popularMoviesFinal = orderedPopularMovies.filter((v) => v.rate >= 5);

  return {
    props: {
      movies: {
        top: [...nowMoviesFinal],
        popular: [...popularMoviesFinal],
      },
    },
  };
};
