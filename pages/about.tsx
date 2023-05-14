import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Layout from "../components/Layout";
import Container from "../components/Container";

const About: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{`Site ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <div className="w-full p-5 mt-10 rounded overflow-hidden shadow ">
          <h1 className="text-3xl font-bold">Acerca</h1>
          <p className="py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ad
            amet fuga sequi quod hic nam eaque labore rem sint? Officiis ut
            architecto dolorum distinctio dignissimos recusandae nam beatae
            sapiente! Excepturi accusamus, quis est distinctio fugiat ipsum quo
            deserunt quae quos soluta veniam eligendi, nostrum blanditiis quia,
            eveniet omnis. Ex doloremque rerum aspernatur, labore perferendis
            debitis iusto dolorem nobis mollitia soluta, enim molestiae est
            veritatis, nam adipisci animi. Dolores aliquid laudantium, velit,
            nisi autem quam, fuga perspiciatis provident inventore dicta earum
            magnam vel aperiam beatae sed deserunt ipsum. Rerum amet facere
            impedit sapiente pariatur veniam dolore. Dolores quos consequatur
            beatae.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default About;
