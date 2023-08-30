import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useReducer, useState } from "react";
import { BackIcon, VideoIcon } from "../../../../../../components/Icons";
import PlayBox from "../../../../../../components/PlayBox";
import { getSourcesEpisode } from "../../../../../api/series.json";
import Link from "next/link";
import { useRouter } from "next/router";

// Resto del código

type MovieData = {
  items: ItemVideoProps;
  lengthSources: number;
};

type ItemVideoProps = {
  vip?: string;
  fast?: string;
  normal?: string;
  slow?: string;
};

export const getServerSideProps: GetServerSideProps<MovieData> = async (
  context
) => {
  const { id, season, idepisode } = context.params!;

  const resItems = await getSourcesEpisode(id, season, idepisode);
  const itemsSources: ItemVideoProps = resItems.sources;
  const lengthSources =
    itemsSources.vip == undefined ? 0 : Object.keys(itemsSources).length;

  const items: ItemVideoProps = {
    vip: itemsSources.vip || null,
    fast: itemsSources.fast || null,
    normal: itemsSources.normal || null,
    slow: itemsSources.slow || null,
  };

  return {
    props: {
      items,
      lengthSources,
    },
  };
};

function VideoEpisode({
  items,
  lengthSources,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [options, setOptions] = useState<ItemVideoProps>({
    vip: "",
    fast: "",
    normal: "",
    slow: "",
  });
  const [currentSource, setSource] = useState("");
  const [hasSource, setHasSource] = useState(false);
  const [showPlay, setShowPlay] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setOptions(items);
  }, []);

  const handleOption = (pos) => {
    window.open(
      "https://www.highwaycpmrevenue.com/wz3uu7ve?key=d7a0ed7005a5be369abb755781ba12e8",
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
            {showPlay && <PlayBox onClick={() => setShowPlay(false)} />}
            {!showPlay && (
              <ul
                className={`${
                  router.asPath.includes("episode")
                    ? "grid grid-cols-2 grid-rows-2 gap-4 justify-center items-center max-w-[45%] mx-auto h-[60vh]"
                    : "flex flex-col gap-y-3 items-center"
                }   py-5`}
              >
                {Object.keys(options).map((v, i) => {
                  return i == 0 ? (
                    <li
                      onClick={() => handleOption(v)}
                      key={i}
                      data-server={v}
                      className="flex gap-x-2 text-white item-view rounded-full py-2 px-3 hover:opacity-[0.8] cursor-pointer justify-center"
                    >
                      <img
                        className="w-[24px] object-cover"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDUlEQVR4nO1YMUscQRj9Iuz3aZB0AbGQC9inSJcqTULEXxCrraySOpBK/AsJeFsFUiT/wWa+yYlYWKSwFAUVCSm1MiE+8bjb827Xvdvd2b0smQev2/nmvZn3plgiDw8PD49/EYhoFW06wxadIqIVahpwK7xN6PGEmgY03kBEKz0TJ2jTa2oiYOUVVF42snwAPYDKPlR+ADRTmx44yi40WIMVdGmCN4XnbOXU48IA9imA5cPYgPIRDojrMRCVLx+MvIvFD/i20KyohB6obGKX5nKtMTQPyz8TBpR/YY8e5Zp1QAzlD7lEDw1Q/twtYmd2aeI1VjZSTr/PjYnn7MwtwvLurYbiBqyE8ekZeTH2++/zj6FykWHgEubhwvh9Z59D+by3JixuwEjrzuZ/oPw+83vlTxni+1H6mD1D1qFyNXjBpFXYQHeg5eNhEfwlrRew8mRo43sNyG8YWU7Nu+VoZK/jUuLjHiRFJHoBlW9jxQ/4NTXvNnFbxfOf6EHaq9LrBTrBU6j8ndiAyjU6wbOUvI8yLG9guAejQq66mbW8neP0+/HYTuR9lGXzf38P6iCXz39mD6qmOsj/2B5Uy9CdgaweVEXjKP/T6QG7y/9UeqAO8z+lHoTuDdTZA+M4//X2gN3nv9YeaAX5r7kHYXUG6uiBqSj/sYnBH4JKSFXDG2j7G/jPI+Th4eHhQXdwA668OoF3W4hAAAAAAElFTkSuQmCC"
                      />{" "}
                      Servidor VIP
                    </li>
                  ) : (
                    <li
                      onClick={() => handleOption(v)}
                      key={i}
                      className="flex gap-x-2 text-black bg-white rounded-full py-2 px-3 hover:opacity-[0.8] cursor-pointer justify-center"
                      data-server={v}
                    >
                      <VideoIcon />
                      Servidor HD {i}
                    </li>
                  );
                })}
              </ul>
            )}
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
            Puede que algunos episodios no estén disponibles en BETA, intenta
            ver otra temporada
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
