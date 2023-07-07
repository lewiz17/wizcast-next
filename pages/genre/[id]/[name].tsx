import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "../../../components/Layout";
import Head from "next/head";
import { CMS_NAME } from "../../../lib/constants";
import Container from "../../../components/Container";
import { useRouter } from "next/router";
import Card from "../../../components/CardItem";

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

type GenreProps = {
  genreMovies: Movie[];
};

export const getServerSideProps: GetServerSideProps<GenreProps> = async (
  context
): Promise<{ props: GenreProps }> => {
  const { id, name } = context.params!;
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&with_genres=${id}`
  );

  const genre_movie = await res.json();

  const genreMovies: Movie[] = genre_movie.results.map((movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    release: movie.release_date,
    rate: movie.vote_average,
  }));

  return {
    props: {
      genreMovies,
    },
  };
};

function Genre({
  genreMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{`${CMS_NAME} - ${router.query.name}`}</title>
      </Head>
      <Container>
        <div className="result-wrap">
          <h2 className="text-2xl font-bold tracking-tight leading-tight my-2 text-white">
            {`Genero ${router.query.name}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-8">
            {genreMovies.flatMap((movie, i) => (
              <Card
                id={movie.id}
                title={movie.title}
                key={movie.id}
                poster={
                  movie.poster !== null
                    ? `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster}`
                    : "/wlogo.png"
                }
                rate={movie.rate}
              />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Genre;
