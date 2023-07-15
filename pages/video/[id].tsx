import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackIcon, VideoIcon } from "../../components/Icons";
import { memoize } from "lodash";

// Resto del código

type VIDEO = string | string[];

type ItemVideoProps = {
  items: VIDEO[];
};

const fetchItems = async (id: VIDEO) => {
  const res = await fetch(`https://api-m1.vercel.app/api/tt${id}`);
  const items = await res.json();
  return items;
};

//const memoizedFetchItems = memoize(fetchItems);

export const getServerSideProps: GetServerSideProps<ItemVideoProps> = async (
  context
) => {
  const { id } = context.params!;
  const items = await fetchItems(id);

  return {
    props: {
      items,
    },
  };
};

function Video({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [options, setOptions] = useState([]);
  const [currentSource, setSource] = useState("");
  const [hasSource, setHasSource] = useState(false);

  useEffect(() => {
    setOptions(items);
  }, [options]);

  const handleOption = (pos) => {
    setHasSource(true);
    setSource(options[pos - 1]);
  };

  return (
    <div className="wrapper item-view min-h-[320px]">
      {!hasSource && options.length > 0 && (
        <ul className="options items-center py-5">
          {Array.from({ length: options.length }).map((v, i) => {
            return i == 0 ? (
              <li onClick={() => handleOption(i + 1)} key={i}>
                <img
                  className="w-[24px] object-cover"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDUlEQVR4nO1YMUscQRj9Iuz3aZB0AbGQC9inSJcqTULEXxCrraySOpBK/AsJeFsFUiT/wWa+yYlYWKSwFAUVCSm1MiE+8bjb827Xvdvd2b0smQev2/nmvZn3plgiDw8PD49/EYhoFW06wxadIqIVahpwK7xN6PGEmgY03kBEKz0TJ2jTa2oiYOUVVF42snwAPYDKPlR+ADRTmx44yi40WIMVdGmCN4XnbOXU48IA9imA5cPYgPIRDojrMRCVLx+MvIvFD/i20KyohB6obGKX5nKtMTQPyz8TBpR/YY8e5Zp1QAzlD7lEDw1Q/twtYmd2aeI1VjZSTr/PjYnn7MwtwvLurYbiBqyE8ekZeTH2++/zj6FykWHgEubhwvh9Z59D+by3JixuwEjrzuZ/oPw+83vlTxni+1H6mD1D1qFyNXjBpFXYQHeg5eNhEfwlrRew8mRo43sNyG8YWU7Nu+VoZK/jUuLjHiRFJHoBlW9jxQ/4NTXvNnFbxfOf6EHaq9LrBTrBU6j8ndiAyjU6wbOUvI8yLG9guAejQq66mbW8neP0+/HYTuR9lGXzf38P6iCXz39mD6qmOsj/2B5Uy9CdgaweVEXjKP/T6QG7y/9UeqAO8z+lHoTuDdTZA+M4//X2gN3nv9YeaAX5r7kHYXUG6uiBqSj/sYnBH4JKSFXDG2j7G/jPI+Th4eHhQXdwA668OoF3W4hAAAAAAElFTkSuQmCC"
                />{" "}
                Servidor VIP
              </li>
            ) : (
              <li
                onClick={() => handleOption(i + 1)}
                key={i}
                className="text-black bg-white rounded-full py-2 px-3 hover:opacity-[0.8]"
              >
                <VideoIcon />
                Servidor {i}
              </li>
            );
          })}
        </ul>
      )}
      {!hasSource && options.length === 0 && (
        <div className="no-options">
          <Image src="/ouch.png" width={64} height={64} alt="info" />
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
