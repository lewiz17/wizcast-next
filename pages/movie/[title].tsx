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
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="md:block md:w-full p-5 sm:mt-0 lg:mt-10 rounded overflow-hidden shadow md:order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-flow-row md:grid-cols-2 gap-5">
              <Image
                src={movie.Poster}
                alt={movie.Title}
                width={250}
                height={200}
                className="w-full"
              />
              <div className="info">
                <h1 className="text-2xl font-bold">{movie.Title}</h1>
                <p className="py-2"><strong>Sinopsis:</strong> {movieDescription}</p>
                <p className="py-2"><strong>Generos:</strong> {movie.Genre}</p>
                <p className="py-2"><strong>Actores:</strong> {movie.Actors}</p>
              </div>
            </div>
          </div>
          <div className="md:block md:w-full p-5  mt-10 rounded overflow-hidden shadow md:order-1 lg:order-2">
            <h2 className="md:h-auto lg:h-0 md:opacity-100 lg:opacity-0 text-2xl font-bold">{movie.Title}</h2>
            <iframe
              className="py-2"
              src={`https://43598303.xyz/video/${movie.imdbID}`}
              allow="fullscreen"
              width={"100%"}
              height={"430"}
            ></iframe>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Movie;
