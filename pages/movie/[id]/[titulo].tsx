import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "../../../components/Layout";
import Head from "next/head";
import { CMS_NAME } from "../../../lib/constants";
import Container from "../../../components/Container";
import { useEffect, useState } from "react";
import Image from "next/image";
import Sharer from "../../../components/Sharer";
import VideoBox from "../../../components/StreamBox";
import { formatDuration } from "../../../utils/helpers";

type MOVIE = {
  imdb_id: number;
  title: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  release_date: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  runtime: number;
};

type MovieProps = {
  movie: MOVIE;
};

export const getServerSideProps: GetServerSideProps<MovieProps> = async (
  context
) => {
  const { id } = context.params!;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX`
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
  const [currentID, setCurrentID] = useState("");
  const [movieDescription, setMovieDescription] = useState("");

  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;

    setCurrentID(movie.imdb_id?.toString().slice(2));
    setMovieDescription(movie.overview);
    setFullUrl(currentUrl);
  }, [currentID]);

  return (
    <Layout>
      <Head>
        <title>{`${CMS_NAME} - ${movie.title}`}</title>
        <meta property="og:title" content={`${CMS_NAME} - ${movie.title}`} />
        <meta property="og:description" content={movie.overview} />
        <meta
          property="og:image"
          content={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${CMS_NAME} - ${movie.title}`} />
        <meta name="twitter:description" content={movie.overview} />
        <meta
          name="twitter:image"
          content={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
        />
        <meta name="twitter:url" content={fullUrl} />
      </Head>
      <Container>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="md:block md:w-full p-5 sm:mt-0 lg:mt-10 rounded overflow-hidden shadow md:order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-flow-row md:grid-cols-2 gap-5">
              <Image
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt={movie.title}
                width={260}
                height={390}
                priority
              />

              <div className="info">
                <h1 className="text-2xl font-bold">{movie.title}</h1>
                <p className="flex py-2 gap-1">
                  <span className="text-black">
                    <strong>{`${movie.vote_average.toFixed(1)} / 10`}</strong>
                  </span>
                  <span className="mx-1">{formatDuration(movie.runtime)}</span>
                  <span>{movie.release_date.split("-")[0]}</span>
                </p>
                <p className="py-2">
                  <strong>Sinopsis:</strong> {movieDescription}
                </p>
                <p className="py-2">
                  <strong>Generos:</strong>{" "}
                  {movie.genres.flatMap((v, i) =>
                    i === movie?.genres.length - 1
                      ? ` ${v.name}`
                      : ` ${v.name},`
                  )}
                </p>
                <p className="py-2">
                  <strong>Lanzamiento:</strong> {movie.release_date}
                </p>
              </div>
            </div>
          </div>
          <div className="playzone md:block md:w-full p-5 mt-10 rounded overflow-hidden shadow md:order-1 lg:order-2">
            <h2 className="text-2xl font-bold ">Servidores</h2>
            <VideoBox videoID={movie.imdb_id?.toString().slice(2)} />
            <Sharer url={fullUrl} />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Movie;