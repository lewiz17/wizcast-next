import { CMS_NAME } from "../../lib/constants";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import Container from "../../components/Container";
import Head from "next/head";
import { StarIcon } from "../../components/Icons";
import { SkeletonCard } from "../../components/SkeletonCard";

const Layout = dynamic(() => import("../../components/Layout"), {
  loading: () => <SkeletonCard />,
});

const SliderBox = dynamic(() => import("../../components/SliderBox"), {
  loading: () => <SkeletonCard />,
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
    netflix: Serie[];
    disney: Serie[];
    prime: Serie[];
    anime: Serie[];
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
          {series.anime.length > 0 ? (
            <SliderBox series={series.anime} title={"Anime"} />
          ) : (
            <SkeletonCard />
          )}
          {series.top.length > 0 ? (
            <SliderBox series={series.top} title={"Top Series"} />
          ) : (
            <SkeletonCard />
          )}
          {series.netflix.length > 0 ? (
            <SliderBox series={series.netflix} title={"Netflix Series"} />
          ) : (
            <SkeletonCard />
          )}
          {series.disney.length > 0 ? (
            <SliderBox series={series.disney} title={"Disney Series"} />
          ) : (
            <SkeletonCard />
          )}
          {series.prime.length > 0 ? (
            <SliderBox series={series.prime} title={"Prime video Series"} />
          ) : (
            <SkeletonCard />
          )}
        </Container>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [nowPlayingSeries, netflixSeries, disneySeries, primeSeries, anime] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&with_watch_providers=8&with_runtime.lte=400&sort_by=popularity.desc&watch_region=CO`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&with_watch_providers=337&with_runtime.lte=400&sort_by=popularity.desc&watch_region=CO`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&with_watch_providers=119&with_runtime.lte=400&sort_by=popularity.desc&watch_region=CO`
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es-MX&with_watch_providers=283&with_runtime.lte=400&sort_by=popularity.desc&watch_region=CO`
      ),
    ]);

  const nowPlayingData = await nowPlayingSeries.json();
  const netflixData = await netflixSeries.json();
  const disneyData = await disneySeries.json();
  const primeData = await primeSeries.json();
  const animeData = await anime.json();

  const nowPlayingSeriesData = nowPlayingData.results.map((serie) => ({
    id: serie.id,
    title: serie.name,
    poster: serie.poster_path,
    release: serie.first_air_date,
    rate: serie.vote_average,
  }));

  const netflixSeriesData = netflixData.results.map((serie) => ({
    id: serie.id,
    title: serie.name,
    poster: serie.poster_path,
    release: serie.first_air_date,
    rate: serie.vote_average,
  }));

  const disneySeriesData = disneyData.results.map((serie) => ({
    id: serie.id,
    title: serie.name,
    poster: serie.poster_path,
    release: serie.first_air_date,
    rate: serie.vote_average,
  }));

  const primeSeriesData = primeData.results.map((serie) => ({
    id: serie.id,
    title: serie.name,
    poster: serie.poster_path,
    release: serie.first_air_date,
    rate: serie.vote_average,
  }));

  const animeSeriesData = animeData.results.map((serie) => ({
    id: serie.id,
    title: serie.name,
    poster: serie.poster_path,
    release: serie.first_air_date,
    rate: serie.vote_average,
  }));

  const nowSeriesFinal = nowPlayingSeriesData.filter((v) => v.rate >= 7);
  const netflixSeriesFinal = netflixSeriesData.filter((v) => v.rate >= 7);
  const disneySeriesFinal = disneySeriesData.filter((v) => v.rate >= 7);
  const primeSeriesFinal = primeSeriesData.filter((v) => v.rate >= 7);
  const animeSeriesFinal = animeSeriesData.filter((v) => v.rate >= 7);

  return {
    props: {
      series: {
        top: [...nowSeriesFinal],
        netflix: [...netflixSeriesFinal],
        disney: [...disneySeriesFinal],
        prime: [...primeSeriesFinal],
        anime: [...animeSeriesFinal],
      },
    },
  };
};
