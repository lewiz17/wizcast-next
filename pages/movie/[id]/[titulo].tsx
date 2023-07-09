import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "../../../components/Layout";
import Head from "next/head";
import { CMS_NAME } from "../../../lib/constants";
import Container from "../../../components/Container";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Sharer from "../../../components/Sharer";
import { formatDuration } from "../../../utils/helpers";
import Tabber from "../../../components/Tabber";
import dynamic from "next/dynamic";
import { getMovieTrailerUrl } from "../../../utils/api";

const VideoBox = dynamic(() => import("../../../components/StreamBox"), {
  loading: () => (
    <p className="flex justify-center items-center text-white h-[400px]">
      Cargando...
    </p>
  ),
});

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
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;

    setCurrentID(movie.imdb_id?.toString());
    setMovieDescription(movie.overview);
    setFullUrl(currentUrl);
  }, [currentID]);

  useEffect(() => {
    const fetchTrailerUrl = async () => {
      const url = await getMovieTrailerUrl(movie.imdb_id?.toString());
      setTrailerUrl(url === null ? "" : url);
    };

    fetchTrailerUrl();
  }, [movie.imdb_id]);

  const tabs = [
    {
      label: "Enlaces",
      content: movie?.imdb_id ? (
        <VideoBox videoID={movie.imdb_id?.toString().slice(2)} />
      ) : (
        <p className="flex justify-center items-center text-white">
          Problema al cargar enlaces
        </p>
      ),
    },
    {
      label: "Trailer",
      content:
        trailerUrl === "" ? (
          <p className="flex text-center text-white">Trailer no encontrado</p>
        ) : (
          <iframe
            className="w-full lg:min-h-[400px] sm:min-h-[250px]"
            src={trailerUrl}
            allowFullScreen={true}
          ></iframe>
        ),
    },
  ];

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
        <div className="container mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="item-view md:w-full p-5 sm:mt-0 lg:mt-10 rounded-lg overflow-hidden shadow md:order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-flow-row md:grid-cols-2 gap-5">
              <Image
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt={movie.title}
                width={260}
                height={390}
                priority
              />

              <div className="info">
                <h1 className="text-2xl font-bold dark:text-white">
                  {movie.title}
                </h1>
                <p className="flex py-2 gap-1">
                  <span className="text-black dark:text-white">
                    <strong>{`${movie.vote_average.toFixed(1)} / 10`}</strong>
                  </span>
                  <span className="mx-1">{formatDuration(movie.runtime)}</span>
                  <span>{movie.release_date.split("-")[0]}</span>
                </p>
                <p className="py-2 dark:text-white">
                  <strong>Sinopsis:</strong> {movieDescription}
                </p>
                <p className="py-2 dark:text-white">
                  <strong>Generos:</strong>{" "}
                  {movie.genres.flatMap((v, i) =>
                    i === movie?.genres.length - 1
                      ? ` ${v.name}`
                      : ` ${v.name},`
                  )}
                </p>
                <p className="py-2 dark:text-white">
                  <strong>Lanzamiento:</strong> {movie.release_date}
                </p>
              </div>
            </div>
            <Sharer url={fullUrl} />
          </div>
          <div className="item-view md:w-full p-5 mt-10 rounded-lg overflow-hidden shadow md:order-1 lg:order-2">
            <h2 className="text-2xl font-bold dark:text-white">Videos</h2>
            <Tabber tabs={tabs} />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Movie;
