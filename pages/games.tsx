import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Layout from "../components/Layout";
import Container from "../components/Container";
import GamesHub from "../components/Games";

const About: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{`Site ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <div className="container mx-auto w-full my-10 rounded overflow-hidden shadow ">
          <h4 className="mt-[4rem] flex gap-[10px] justify-center items-center">
            Bienvenid(@) a nuestro catalogo de ofertas, se irán agregando más
            y/o actualizando semanalmente!
          </h4>
          <GamesHub />
        </div>
      </Container>
    </Layout>
  );
};

export default About;
