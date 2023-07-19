import { AppProps } from "next/app";
import "nprogress/nprogress.css";
import "../styles/main.css";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { Toaster, toast } from "react-hot-toast";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  const TIMES = [10, 20, 30, 15, 25, 35, 5];
  const OPTIONS = ["vote", "donate"];
  const [currentTime, setCurrentTime] = useState(0);
  const [currentOption, setCurrentOption] = useState(0);
  const currentURL = router.asPath;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(Math.floor(Math.random() * TIMES.length));
      setCurrentOption(Math.floor(Math.random() * OPTIONS.length));

      if (currentURL.includes("video") !== true) {
        if (OPTIONS[currentOption] == "donate") {
          toast("Alguien hizo un aporte a WZP", {
            icon: "👏",
          });
        } else {
          toast("Alguien dió su voto en WZP", {
            icon: "🔥",
          });
        }
      }
    }, TIMES[currentTime] * 1000);
    return () => clearInterval(interval);
  }, [currentTime, currentOption]);

  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </>
  );
}
