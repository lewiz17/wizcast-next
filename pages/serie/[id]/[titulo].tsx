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
import Image from "next/image";
import Sharer from "../../../components/Sharer";
import { formatDuration, formatRate } from "../../../utils/helpers";
import Tabber from "../../../components/Tabber";
import dynamic from "next/dynamic";
import Error from "next/error";
import SliderBox from "../../../components/SliderBox";
import { getData } from "../../api/movie.json";
import { StarIcon } from "../../../components/Icons";
import PlayBox from "../../../components/PlayBox";
import { getSerie } from "../../api/series.json";
import SeasonBox from "../../../components/SeasonBox";

const VideoBox = dynamic(() => import("../../../components/StreamBox"), {
  loading: () => (
    <p className="flex justify-center items-center text-white h-[400px]">
      Cargando...
    </p>
  ),
});

interface SerieGenre {
  id?: number;
  name?: string;
}

type SERIE = {
  id: number;
  title: string;
  overview: string;
  poster: string;
  rating: number;
  date_release;
  genres: SerieGenre[];
  seasons: number;
};

type SerieProps = {
  serie: SERIE;
};

export const getServerSideProps: GetServerSideProps<SerieProps> = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params!;

  const serieData = await getSerie(id);

  if (!serieData) {
    <Error statusCode={500} />;
  }

  const serie = serieData;

  return {
    props: {
      serie,
    },
  };
};

function Serie({ serie }: SerieProps): JSX.Element {
  const [serieDes, setSerieDes] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const currentUrl = window.location.href;

    setSerieDes(serie?.overview);
    setFullUrl(currentUrl);
    setLoading(false);
  }, [serie?.id]);

  return (
    <Layout>
      <Head>
        <title>{`${CMS_NAME} - ${serie.title}`}</title>
        <meta property="og:title" content={`${CMS_NAME} - ${serie.title}`} />
        <meta property="og:description" content={serie.overview} />
        <meta
          property="og:image"
          content={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${serie.poster}`}
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${CMS_NAME} - ${serie.title}`} />
        <meta name="twitter:description" content={serie.overview} />
        <meta
          name="twitter:image"
          content={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${serie.poster}`}
        />
        <meta name="twitter:url" content={fullUrl} />
      </Head>
      <Container>
        <div className="container mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-4 my-5">
          <div className="item-view md:w-full p-5 sm:mt-0 lg:mt-10 rounded-lg overflow-hidden shadow md:order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-flow-row md:grid-cols-2 gap-5">
              <img
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${serie.poster}`}
                alt={serie.title}
                width={260}
                height={390}
                className="item-view"
                loading="lazy"
              />

              <div className="info">
                <h1 className="text-2xl font-bold dark:text-white">
                  {serie.title}
                </h1>
                <p className="flex py-2 gap-1">
                  <span className="text-black dark:text-white">
                    <strong className="flex gap-2 items-center">
                      <StarIcon />
                      {formatRate(serie.rating)} -
                    </strong>
                  </span>
                  <span className="mx-1 dark:text-white">
                    {serie.seasons > 1
                      ? `${serie.seasons} Temporadas -`
                      : `${serie.seasons} Temporada -`}
                  </span>
                  <span className="dark:text-white">{serie?.date_release}</span>
                </p>
                {serieDes && (
                  <p className="info-box py-2 dark:text-white">
                    <strong>Sinopsis:</strong> {serieDes}
                  </p>
                )}
                <p className="py-2 dark:text-white">
                  <strong>Generos:</strong>{" "}
                  {serie.genres.flatMap((v, i) =>
                    i === serie?.genres.length - 1
                      ? ` ${v.name}`
                      : ` ${v.name},`
                  )}
                </p>
                <p className="py-2 dark:text-white">
                  <strong>Ultima temporada:</strong> {serie.date_release}
                </p>
              </div>
            </div>
            <Sharer url={fullUrl} />
          </div>
          <div className="item-view md:w-full p-5 mt-10 rounded-lg overflow-hidden shadow md:order-1 lg:order-2">
            <SeasonBox count={serie.seasons} id={serie.id} />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Serie;
