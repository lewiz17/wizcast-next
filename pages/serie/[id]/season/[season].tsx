import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Error from "next/error";
import { getSeasonSerie, getSerie } from "../../../../pages/api/series.json";
import Link from "next/link";
import { useRouter } from "next/router";
import { SkeletonCard } from "../../../../components/SkeletonCard";
import { DownIcon, UpIcon } from "../../../../components/Icons";

const VideoBox = dynamic(() => import("../../../../components/StreamBox"), {
  loading: () => <SkeletonCard />,
});

type episode = {
  id: number;
  name: string;
  poster: string;
  epnumber: number;
};

type SeasonProps = {
  season: {
    serieName: string;
    imdbID: string;
    numSeason: number;
    seasonData: {
      id: number;
      episodes: episode[];
    };
    totalEpisodes: number;
  };
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id, season } = context.params!;

  const imdbID = (await getSerie(id)).serieID;
  const serieName = (await getSerie(id)).title;
  const totalEpisodes = (await getSerie(id)).totalEpisodes;

  const seasonData = await getSeasonSerie(id, season);

  const seasonJSON = {
    serieName,
    imdbID,
    numSeason: season,
    seasonData,
    totalEpisodes,
  };

  if (!seasonData) {
    <Error statusCode={500} />;
  }

  return {
    props: {
      season: { ...seasonJSON },
    },
  };
};

function SeasonSerie({ season }: SeasonProps): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [stateBox, setStateBox] = useState("top");

  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    season.seasonData.episodes.length > 0
      ? setLoading(false)
      : setLoading(true);
  }, [season.seasonData.id]);

  const handleScrollDown = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
    setStateBox("bottom");
  };
  const handleScrollTop = () => {
    const firstElement = ref.current?.firstElementChild;
    firstElement?.scrollIntoView({ behavior: "smooth" });
    setStateBox("top");
  };

  const handleEpisode = (num) => {
    window.parent.location.replace(`${router.asPath}/episode/${num}`);
  };

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-y-[10px] my-5">
      <div
        ref={ref}
        className={`flex flex-wrap ${
          router.asPath.includes("season") ? "gap-x-[3.5%]" : "gap-x-[1.8rem]"
        } gap-y-4 justify-start`}
      >
        {isLoading && <SkeletonCard />}
        {!isLoading &&
          season.seasonData.episodes.map((ep, i) => {
            return (
              <div
                className={`flex flex-col item-episode hover:opacity-60`}
                key={ep.id}
                data-episode-num={ep.epnumber}
                onClick={() => handleEpisode(ep.epnumber)}
              >
                <img
                  src={
                    ep.poster !== null
                      ? `https://www.themoviedb.org/t/p/w500${ep.poster}`
                      : "/wlogo.png"
                  }
                  alt={ep.name}
                  width={170}
                  className="rounded-lg h-[93px]"
                  loading="lazy"
                  title={ep.name}
                />
                <span className="text-white text-sm gap-x-2 text-center my-2 flex items-center flex justify-center w-[170px]">
                  <i className="text-xs rounded-[100px] bg-white px-2 text-black font-bold not-italic">
                    {season.numSeason}x{ep.epnumber}
                  </i>
                  {"  "}
                  {season.serieName}
                </span>
              </div>
            );
          })}
      </div>
      <button className="fixed bg-black w-full top-[auto] bottom-[0px] py-2 flex justify-center gap-x-5">
        <>
          <DownIcon
            onClick={handleScrollDown}
            className={`arrow-down ${
              stateBox === "bottom" ? "opacity-[0.3] pointer-events-none" : ""
            }`}
          />
          <UpIcon
            onClick={handleScrollTop}
            className={`arrow-up ${
              stateBox === "top" ? "opacity-[0.3] pointer-events-none" : ""
            }`}
          />
        </>
      </button>
    </div>
  );
}

export default SeasonSerie;
