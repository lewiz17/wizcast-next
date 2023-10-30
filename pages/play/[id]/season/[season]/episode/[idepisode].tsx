import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useReducer, useState } from "react";
import { BackIcon, VideoIcon } from "../../../../../../components/Icons";
import PlayBox from "../../../../../../components/PlayBox";
import { getSourcesEpisode } from "../../../../../api/series.json";
import Link from "next/link";
import { useRouter } from "next/router";
import { handleNameServer } from "../../../../../../utils/helpers";

// Resto del código

type MovieData = {
  itemsSources: {};
  lengthSources: number;
};

export const getServerSideProps: GetServerSideProps<MovieData> = async (
  context
) => {
  const { id, season, idepisode } = context.params!;

  const resItems = await getSourcesEpisode(id, season, idepisode);
  const itemsSources = resItems.sources;

  console.log("sources", itemsSources);

  const lengthSources = Object.keys(itemsSources).length;

  return {
    props: {
      itemsSources,
      lengthSources,
    },
  };
};

function VideoEpisode({
  itemsSources,
  lengthSources,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [options, setOptions] = useState({});
  const [currentSource, setSource] = useState("");
  const [hasSource, setHasSource] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOptions(itemsSources);
  }, []);

  const handleOption = (pos) => {
    window.open(
      "https://www.highcpmrevenuegate.com/fmtqin07z?key=21b0d07f1e94283d83d76e123b758395",
      "_blank"
    );
    setHasSource(true);
    setSource(options[pos]);
  };

  return (
    <div className="wrapper item-view min-h-[320px]">
      {!hasSource &&
        options &&
        Object.keys(options).length > 0 &&
        lengthSources > 0 && (
          <>
            {
              <ul
                className={`${
                  router.asPath.includes("episode")
                    ? "grid md:grid-cols-2 sm:grid-cols-1 gap-4 justify-center items-center max-w-[45%] mx-auto h-[60vh]"
                    : "flex flex-col gap-y-3 items-center"
                }   py-5`}
              >
                {Object.keys(options).map((v, i) => {
                  return (
                    <li
                      onClick={() => handleOption(v)}
                      key={i}
                      data-server={v}
                      className="cursor-pointer text-white flex item-view gap-x-1 rounded-full px-3 py-2 min-w-[80%] hover:opacity-[0.8] hover:bg-white hover:text-black"
                    >
                      <span className="text-sm font-bold">
                        {handleNameServer(options[v])}
                      </span>
                      <span className="text-sm text-gray">- Stream HD</span>
                    </li>
                  );
                })}
              </ul>
            }
          </>
        )}
      {hasSource && lengthSources > 0 && (
        <div className="iframe-wrapper">
          <button
            className="backBtn p-2 bg-black rounded-full m-2 hover:opacity-[0.8] item-view"
            onClick={() => setHasSource(false)}
          >
            <BackIcon />
          </button>
          <iframe
            id="player"
            src={currentSource}
            allow="fullscreen"
            width="100%"
            height="100%"
            title="Pelicula"
          ></iframe>
        </div>
      )}
      {!hasSource && lengthSources == 0 && (
        <div className="no-options">
          <img
            src="/ouch.png"
            width={64}
            height={64}
            alt="info"
            loading="lazy"
          />
          <p>No disponible por el momento</p>
          <span>
            Puedes regresar más tarde o intentar ver otro epidosio / temporada
          </span>
          <Link
            href="/series"
            className="text-black font-bold bg-white rounded-full py-2 px-4 hover:opacity-[0.8]"
            target="_top"
          >
            Volver a Series
          </Link>
        </div>
      )}
    </div>
  );
}

export default VideoEpisode;
