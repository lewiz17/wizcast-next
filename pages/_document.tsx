import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { useEffect } from "react";

const GA_TRACKING_ID = "G-GV9HP0EZL0";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
          }}
        />
        <script type='text/javascript' src='//milestonebreathdilate.com/e7/3b/c8/e73bc8217affb147f1db84d964a6da7d.js'></script>
      </Head>
      <body className="dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
