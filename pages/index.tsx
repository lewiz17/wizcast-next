import Container from "../components/Container";
import Layout from "../components/Layout";
import Card from "../components/CardItem";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  const [listMovies, setListMovies] = useState<string[]>([]);
  const [listPosters, setListPosters] = useState<string[]>([]);
  const [listIDS, setListIDS] = useState<string[]>([]);
  const [listRates, setListRates] = useState<number[]>([]);

  const router = useRouter();
  const { list } = router.query;

  useEffect(() => {
    const { top, popular } = movies;
    const ids = [];
    const titles = [];
    const posters = [];
    const rates = [];

    if (list === "popular") {
      Object.entries(popular).map((v, i) => {
        const { title, poster, id, rate } = v[1];
        ids.push(id);
        titles.push(title);
        posters.push(poster);
        rates.push(rate);
      });
    } else {
      Object.entries(top).map((v, i) => {
        const { title, poster, id, rate } = v[1];
        ids.push(id);
        titles.push(title);
        posters.push(poster);
        rates.push(rate);
      });
    }

    setListMovies(titles);
    setListPosters(posters);
    setListIDS(ids);
    setListRates(rates);
  }, [movies.top, movies.popular]);

  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME} - Estrenos ${new Date().getFullYear()}`}</title>
        </Head>
        <Container>
          {list === "popular" && (
            <h2 className="text-2xl font-bold text-white tracking-tight leading-tight my-2">
              Populares
            </h2>
          )}
          {list !== "popular" && (
            <h2 className="text-2xl font-bold text-white tracking-tight leading-tight my-2">
              Top Estrenos
            </h2>
          )}
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-8">
            {listMovies.flatMap((movie, i) => (
              <Card
                id={listIDS[i]}
                title={movie}
                rate={listRates[i]}
                key={i}
                poster={`https://www.themoviedb.org/t/p/w220_and_h330_face${listPosters[i]}`}
              />
            ))}
          </div>
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
