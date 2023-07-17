import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "../../../components/Layout";
import Head from "next/head";
import { CMS_NAME } from "../../../lib/constants";
import Container from "../../../components/Container";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Sharer from "../../../components/Sharer";
import { formatDuration, formatRate } from "../../../utils/helpers";
import Tabber from "../../../components/Tabber";
import dynamic from "next/dynamic";
import { getMovieTrailerUrl } from "../../../utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import Error from "next/error";
import { type } from "os";
import SliderBox from "../../../components/SliderBox";

const VideoBox = dynamic(() => import("../../../components/StreamBox"), {
  loading: () => (
    <p className="flex justify-center items-center text-white h-[400px]">
      Cargando...
    </p>
  ),
});

type MOVIE = {
  id: number;
  title: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  date_release: string;
  poster: string;
  overview: string;
  rating: number;
  duration: number;
  trailer: string;
  sources: object;
};

type MovieProps = {
  movie: MOVIE;
  related: MOVIERELATED;
};

type MOVIERELATED = {
  moviesRelates: [
    {
      id: number;
      poster_path: string;
      title: string;
      vote_average: number;
    }
  ];
};

export const getServerSideProps: GetServerSideProps<MovieProps> = async (
  context
) => {
  const { id } = context.params!;

  const movieData = await fetch(
    `http://localhost:3000/api/movie.json?id=${id}`
  );

  if (!movieData.ok) {
    <Error statusCode={500} />;
  }

  const movie = await movieData.json();
  const related = { ...movie };

  return {
    props: {
      movie,
      related,
    },
  };
};

function Movie({ movie, related }: MovieProps): JSX.Element {
  const [movieDescription, setMovieDescription] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const currentUrl = window.location.href;

    setMovieDescription(movie?.overview);
    setFullUrl(currentUrl);
    setLoading(false);
  }, [movie?.id]);

  const tabs = [
    {
      label: "Enlaces",
      content: isLoading ? (
        <p className="flex justify-center items-center text-white">
          Cargando...
        </p>
      ) : (
        <VideoBox video={movie.id} />
      ),
    },
    {
      label: "Trailer",
      content:
        movie.trailer === "" ? (
          <p className="flex text-center text-white">Trailer no encontrado</p>
        ) : (
          <iframe
            className="w-full lg:min-h-[400px] sm:min-h-[250px]"
            src={`https://www.youtube.com/embed/${movie.trailer}?color=white&showinfo=0&rel=0`}
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
          content={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster}`}
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${CMS_NAME} - ${movie.title}`} />
        <meta name="twitter:description" content={movie.overview} />
        <meta
          name="twitter:image"
          content={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster}`}
        />
        <meta name="twitter:url" content={fullUrl} />
      </Head>
      <Container>
        <div className="container mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-4 my-5">
          <div className="item-view md:w-full p-5 sm:mt-0 lg:mt-10 rounded-lg overflow-hidden shadow md:order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-flow-row md:grid-cols-2 gap-5">
              <Image
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster}`}
                alt={movie.title}
                width={260}
                height={390}
                className="item-view"
                priority
              />

              <div className="info">
                <h1 className="text-2xl font-bold dark:text-white">
                  {movie.title}
                </h1>
                <p className="flex py-2 gap-1">
                  <span className="text-black dark:text-white">
                    <strong>{formatRate(movie.rating)}</strong>
                  </span>
                  <span className="mx-1 dark:text-white">
                    {formatDuration(movie.duration)}
                  </span>
                  <span className="dark:text-white">{movie?.date_release}</span>
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
                  <strong>Lanzamiento:</strong> {movie.date_release}
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
        <div className="hmax-[300px]">
          {related ? (
            <SliderBox relates={related} title={`Similares a ${movie.title}`} />
          ) : (
            <p className="flex justify-center items-center text-2xl">
              Cargando...
            </p>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default Movie;
