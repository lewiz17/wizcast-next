import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "../../components/Layout";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Container from "../../components/Container";
import { useEffect, useState } from "react";
import { translateText } from "../../utils/translator";
import Image from "next/image";

type MOVIE = {
  imdbID: number;
  Title: string;
  Genre: string;
  Poster: string;
  Actors: string;
  Plot: string;
};

type MovieProps = {
  movie: MOVIE;
};

export const getServerSideProps: GetServerSideProps<MovieProps> = async (
  context
) => {
  const { title } = context.params!;
  const res = await fetch(
    `https://www.omdbapi.com/?t=${title}&page=1&apikey=53823f54&plot=full`
  );
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
};

function Movie({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [currentMovie, setCurrentMovie] = useState("");
  const [movieDescription, setMovieDescription] = useState("");

  const handleTranslate = async () => {
    const translated = await translateText(currentMovie, "es");
    setMovieDescription(translated);
  };

  useEffect(() => {
    setCurrentMovie(movie.Plot);
    handleTranslate();
  }, [currentMovie]);

  return (
    <Layout>
      <Head>
        <title>{`${CMS_NAME} - ${movie.Title}`}</title>
      </Head>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="w-full p-5 mt-10 rounded overflow-hidden shadow">
            <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-flow-row md:grid-cols-2 gap-5">
              <Image
                src={movie.Poster}
                alt={movie.Title}
                width={250}
                height={200}
                className="w-full"
              />
              <div className="info">
                <h1 className="text-3xl font-bold">{movie.Title}</h1>
                <p className="py-2">{movieDescription}</p>
                <p className="py-2">{movie.Genre}</p>
                <p className="py-2">{movie.Actors}</p>
              </div>
            </div>
          </div>
          <div className="w-full p-5 mt-10 rounded overflow-hidden shadow ">
            <iframe
              className="py-2"
              src={`https://43598303.xyz/video/${movie.imdbID}`}
              allow="fullscreen"
              width={"100%"}
              height={350}
            ></iframe>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Movie;
