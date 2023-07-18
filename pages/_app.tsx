import { AppProps } from "next/app";
import "nprogress/nprogress.css";
import "../styles/main.css";
import { useEffect } from "react";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";

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

  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </>
  );
}
