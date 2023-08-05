import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

const Meta = () => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={`${CMS_NAME}.`} />
    </Head>
  );
};

export default Meta;
