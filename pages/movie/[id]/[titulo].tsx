import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Layout from "../../../components/Layout";
import Head from "next/head";
import { CMS_NAME } from "../../../lib/constants";
import Container from "../../../components/Container";
import { useEffect, useState } from "react";
import Sharer from "../../../components/Sharer";
import { formatDuration, formatRate } from "../../../utils/helpers";
import Tabber from "../../../components/Tabber";
import dynamic from "next/dynamic";
import Error from "next/error";
import SliderBox from "../../../components/SliderBox";
import { getData } from "../../api/movie.json";
import { StarIcon } from "../../../components/Icons";
import PlayBox from "../../../components/PlayBox";
import { SkeletonCard } from "../../../components/SkeletonCard";
import VideoLanguageButtons from "../../../components/DownloadServers";

const VideoBox = dynamic(() => import("../../../components/StreamBox"), {
  loading: () => <SkeletonCard />,
});

interface MovieGenre {
  id?: number;
  name?: string;
}

type MOVIE_REL = {
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

type MOVIE = {
  id: number;
  title: string;
  overview: string;
  poster: string;
  duration: number;
  rating: number;
  date_release;
  trailer: string;
  castData: object[];
  moviesRelates: MOVIE_REL[];
  genres: MovieGenre[];
};

type Relates = {
  moviesRelates: Array<{
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
  }>;
};

type MovieProps = {
  movie: MOVIE;
  imdb_id: string;
  related: Relates;
};

export const getServerSideProps: GetServerSideProps<MovieProps> = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params!;

  const movieData = await getData(id);

  if (!movieData) {
    <Error statusCode={500} />;
  }

  const movie = movieData;
  const related = movieData;
  const imdb_id = movieData.imdbID;

  return {
    props: {
      movie,
      related,
      imdb_id
    },
  };
};

function Movie({ movie, related, imdb_id }: MovieProps): JSX.Element {
  const [movieDescription, setMovieDescription] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const currentUrl = window.location.href;

    setMovieDescription(movie?.overview);
    setFullUrl(currentUrl);
    setLoading(false);

    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/stream/${imdb_id}`); // Ajusta la ruta de tu API
        const data = await response.json();
        
        if (data) {
          setVideoData(data); // Guarda los datos en el estado
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();

  }, [movie?.id]);

  const tabs = [
    {
      label: "Servidores 🇲🇽",
      content: isLoading ? (
        <SkeletonCard />
      ) : (
        <>
          <iframe src={`https://embed69.org/f/${imdb_id}`} style={{ width: "100%", height: "350px"}}/>
        </>
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
              <img
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster}`}
                alt={movie.title}
                width={260}
                height={390}
                className="item-view"
                loading="lazy"
              />

              <div className="info">
                <h1 className="text-2xl font-bold dark:text-white">
                  {movie.title}
                </h1>
                <p className="flex py-2 gap-1">
                  <span className="text-black dark:text-white">
                    <strong className="flex gap-2 items-center">
                      <StarIcon />
                      {formatRate(movie.rating)} -
                    </strong>
                  </span>
                  <span className="mx-1 dark:text-white">
                    {formatDuration(movie.duration)}
                  </span>
                  <span className="dark:text-white">{movie?.date_release}</span>
                </p>
                <p className="info-box py-2 dark:text-white">
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
            <VideoLanguageButtons data={videoData} />
          </div>
        </div>
        <div className="hmax-[300px]">
          {related ? (
            <SliderBox
              relates={related}
              title={`Porque viste ${movie.title}`}
            />
          ) : (
            <SkeletonCard />
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default Movie;
