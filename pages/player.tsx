import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Layout from "../components/Layout";
import Container from "../components/Container";

const Player: React.FC = (items) => {
  return (
    <Layout>
      <Head>
        <title>{`Site ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <div className="w-full">{items}</div>
      </Container>
    </Layout>
  );
};

export default Player;
