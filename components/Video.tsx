import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

type VIDEO = {
    idVideo: string
    urlVideo: {
        key: string
    }
};
  
type VideoProps = {
    video: VIDEO;
};

export default function Trailer({ idVideo }: VIDEO) {
  const [currentVideo, setCurrentVideo] = useState<string>('');

  useEffect(() => {;
    setCurrentVideo(idVideo);
  }, [idVideo]);

  return (
    <>
      <iframe
        className="py-2"
        src={`https://youtu.be/${currentVideo}`}
        allow="fullscreen"
        width={"100%"}
        height={350}
    ></iframe>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<VideoProps> = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${idVideo}/videos?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=es`
  );
  const urlVideo = await res.json();

  return {
    props: {
        urlVideo,
    },
  };
};
