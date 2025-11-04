import React, { useMemo } from "react";

type SerieData = {
  id: number;
  season: number;
  episode: number;
};

const SeriePlayer: React.FC<SerieData> = ({ id, season, episode }) => {
  const memoizedIframe = useMemo(
    () => (
      <>
      <iframe
        className="py-2"
        src={`https://vidfast.pro/tv/${id}/${season}/${episode}?server=Pablo&autoPlay=true&theme=FF0000&hideServer=true&autoNext=true`}
        allow="fullscreen"
        width={"100%"}
        height={"340"}
        title="Serie"
      ></iframe>
      <a href="https://milestonebreathdilate.com/wz4tqxa9?key=17b108a1ee87e0bbc25b5bd099b0dc28">Ver más</a>
      </>
    ),
    [id]
  );

  return memoizedIframe;
};

export default SeriePlayer;
