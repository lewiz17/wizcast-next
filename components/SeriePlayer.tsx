import React, { useMemo } from "react";

type SerieData = {
  id: number;
  season: number;
  episode: number;
};

const SeriePlayer: React.FC<SerieData> = ({ id, season, episode }) => {
  const memoizedIframe = useMemo(
    () => (
      <iframe
        className="py-2"
        src={`https://vidfast.pro/tv/${id}/${season}/${episode}?server=Pablo&autoPlay=true&theme=FF0000&hideServer=true&autoNext=true`}
        allow="fullscreen"
        width={"100%"}
        height={"340"}
        title="Serie"
      ></iframe>
    ),
    [id]
  );

  return memoizedIframe;
};

export default SeriePlayer;
