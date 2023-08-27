import { CMS_NAME } from "../../lib/constants";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import Container from "../../components/Container";
import Head from "next/head";
import { StarIcon } from "../../components/Icons";

const Layout = dynamic(() => import("../../components/Layout"), {
  loading: () => <p>Cargando...</p>,
});

const SliderBox = dynamic(() => import("../../components/SliderBox"), {
  loading: () => <p>Cargando...</p>,
});

type Serie = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  poster: string;
  title: string;
  rate: number;
};

type Props = {
  series: {
    top: Serie[];
  };
};

export default function ListItems({ series }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME} - Estrenos ${new Date().getFullYear()}`}</title>
        </Head>
        <Container>
          {series.top.length > 0 ? (
            <SliderBox series={series.top} title={"Top Series"} />
          ) : (
            <p className="flex justify-center items-center text-2xl h-[200px]">
              Cargando...
            </p>
          )}
        </Container>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [nowPlayingSeries] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX`
    ),
  ]);

  const nowPlayingData = await nowPlayingSeries.json();

  const nowPlayingSeriesData = nowPlayingData.results.map((serie) => ({
    id: serie.id,
    title: serie.name,
    poster: serie.poster_path,
    release: serie.first_air_date,
    rate: serie.vote_average,
  }));

  const nowSeriesFinal = nowPlayingSeriesData.filter((v) => v.rate >= 6);

  return {
    props: {
      series: {
        top: [...nowSeriesFinal],
      },
    },
  };
};
