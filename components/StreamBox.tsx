import React, { useMemo } from "react";

type VIDEO = {
  videoID: string;
};

const VideoBox: React.FC<VIDEO> = ({ videoID }) => {
  const memoizedIframe = useMemo(
    () => (
      <iframe
        className="py-2"
        src={`/video/${videoID}`}
        allow="fullscreen"
        width={"100%"}
        height={"400"}
        title="Pelicula"
      ></iframe>
    ),
    [videoID]
  );

  return memoizedIframe;
};

export default VideoBox;
