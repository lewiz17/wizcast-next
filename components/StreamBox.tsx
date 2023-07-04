import React from "react";

type VIDEOS = {
  videoID: string;
};

const VideoBox: React.FC<VIDEOS> = ({ videoID }: VIDEOS) => {
  return (
    <iframe
      className="py-2"
      src={`/video/${videoID}`}
      allow="fullscreen"
      width={"100%"}
      height={"430"}
    ></iframe>
  );
};

export default VideoBox;
