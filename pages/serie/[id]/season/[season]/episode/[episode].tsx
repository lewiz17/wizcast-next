import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Layout from "../../../../../../components/Layout";
import Head from "next/head";
import Container from "../../../../../../components/Container";
import { useEffect, useState } from "react";
import SeriePlayer from "../../../../../../components/SeriePlayer";
import SeasonBox from "../../../../../../components/SeasonBox";
import {
  getSeasonSerie,
  getSerie,
  getSourcesEpisode,
} from "../../../../../api/series.json";
import { BackIcon } from "../../../../../../components/Icons";
import { useRouter } from "next/router";
import { formatTitle } from "../../../../../../utils/helpers";

type SerieProps = {
  serieData: {
    id: number;
    season: number;
    episode: number;
    count: number;
    name: string;
    nameEpisode: string;
  };
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id, season, episode } = context.params!;

  const { seasons, title, serieID } = await getSerie(id);

  const { name } = (await getSourcesEpisode(id, season, episode))
    .episodeData[0];

  const serieData = {
    id: id,
    season: season,
    episode: episode,
    nameEpisode: name,
    count: seasons,
    name: title,
  };

  return {
    props: {
      serieData,
    },
  };
};

function Episode({ serieData }: SerieProps): JSX.Element {
  const router = useRouter();

  const handleBackSerie = () => {
    router.push(`/serie/${serieData.id}/${formatTitle(serieData.name)}`);
  };

  return (
    <Layout>
      <Container>
        <div className="container mx-auto grid md:grid-cols-1 gap-4 my-5">
          <h1 className="flex gap-x-2 items-center">
            <button
              className="p-2 bg-black rounded-full hover:opacity-[0.8] item-view"
              onClick={() => handleBackSerie()}
            >
              <BackIcon />
            </button>
            <strong>{serieData.name}</strong>{" "}
            <span className="text-sm rounded-[100px] bg-white px-2 text-black font-bold">
              {serieData.season}x{serieData.episode}
            </span>
            <span>{serieData.nameEpisode}</span>
          </h1>
          <SeriePlayer
            id={serieData.id}
            season={serieData.season}
            episode={serieData.episode}
          />
          <div className="serie-container">
            <SeasonBox count={serieData.count} id={serieData.id} />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Episode;
