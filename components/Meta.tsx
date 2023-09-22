import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

const Meta = () => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={`${CMS_NAME}.`} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
    </Head>
  );
};

export default Meta;
