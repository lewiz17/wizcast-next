import { AppProps } from "next/app";
import "nprogress/nprogress.css";
import "../styles/main.css";
import "../styles/modal.css";
import { useEffect } from "react";
import NProgress from "nprogress";
import { ModalProvider } from "../components/ModalContext";
import Modal from "../components/Modal";
import Script from "next/script";

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
      <ModalProvider>
        <Script
          strategy="lazyOnload"
          id="script-component-ad"
          src="https://jsc.adskeeper.co.uk/site/957038.js"
          async
        />
        <Script id="define-slot" strategy="lazyOnload">{`
          (function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq"); 
      `}</Script>
        <Component {...pageProps} />
        <Modal />
      </ModalProvider>
    </>
  );
}
