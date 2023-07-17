import React, { useMemo } from "react";

type VIDEO = {
  video: number;
};

const VideoBox: React.FC<VIDEO> = ({ video }) => {
  const memoizedIframe = useMemo(
    () => (
      <iframe
        className="py-2"
        src={`/video/${video}`}
        allow="fullscreen"
        width={"100%"}
        height={"340"}
        title="Pelicula"
      ></iframe>
    ),
    [video]
  );

  return memoizedIframe;
};

export default VideoBox;
