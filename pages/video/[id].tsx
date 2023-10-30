import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackIcon, VideoIcon } from "../../components/Icons";
import { memoize } from "lodash";
import { getData, getSourcesVideo } from "../api/movie.json";
import { handleNameServer } from "../../utils/helpers";
// Resto del código

type MovieData = {
  itemsSources: {};
};

export const getServerSideProps: GetServerSideProps<MovieData> = async (
  context
) => {
  const { id } = context.params!;

  const resItems = await getSourcesVideo(id);
  const itemsSources = resItems.sources;

  return {
    props: {
      itemsSources,
    },
  };
};

function Video({
  itemsSources,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [options, setOptions] = useState({});
  const [currentSource, setSource] = useState("");
  const [hasSource, setHasSource] = useState(false);

  useEffect(() => {
    setOptions(itemsSources);
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
      {!hasSource && options && Object.keys(options).length > 0 && (
        <>
          {
            <ul className="flex flex-col items-center p-10 gap-y-4">
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

      {!hasSource && Object.keys(options).length === 0 && (
        <div className="no-options">
          <img
            src="/ouch.png"
            width={64}
            height={64}
            alt="info"
            loading="lazy"
          />
          <p>No disponible por el momento</p>
          <span>Regresa más tarde o revisa nuestro catálogo</span>
          <Link
            href="/"
            className="text-black font-bold bg-white rounded-full py-2 px-4 hover:opacity-[0.8]"
            target="_top"
          >
            Volver
          </Link>
          <Link
            title="Deseas mantener el sitio? Envia tu grano de arena aquí"
            href={"https://ko-fi.com/wiz2023"}
            className="text-black font-bold bg-white rounded-full py-2 px-4 hover:opacity-[0.8]"
          >
            Apoyanos
          </Link>
        </div>
      )}
      {hasSource && (
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
    </div>
  );
}

export default Video;
