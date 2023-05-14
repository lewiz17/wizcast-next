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
          <p className="py-2">
            Bienvenido a nuestra página web de películas, donde encontrarás toda la información que
            necesitas sobre tus películas favoritas. Ya sea que busques clásicos
            de Hollywood o las últimas producciones cinematográficas, nuestro
            sitio tiene todo lo que necesitas para mantenerte al día con las
            últimas novedades de la industria. Nuestro equipo de expertos en
            cine se dedica a proporcionar reseñas detalladas de las últimas
            películas, así como también información sobre próximos estrenos y
            eventos de la industria.</p>
            <p className="py-1">
            También ofrecemos recomendaciones de
            películas basadas en tus géneros y actores favoritos, para que
            siempre encuentres algo nuevo para ver. Además de nuestras reseñas
            de películas, también encontrarás noticias y artículos sobre el
            mundo del cine, incluyendo entrevistas con actores y directores,
            análisis de taquilla y tendencias en la industria. Y si eres un
            verdadero fanático del cine, ¡asegúrate de visitar nuestra sección
            de trivia, donde podrás poner a prueba tus conocimientos sobre
            películas y actores! Nos enorgullece ofrecer una experiencia de
            usuario de alta calidad, con una interfaz intuitiva y fácil de usar
            que te permite navegar por nuestro sitio de manera fácil y rápida.
            </p>
            <p className="py-1">
            Además, trabajamos duro para garantizar que nuestro sitio esté
            actualizado con las últimas noticias y estrenos de películas, para
            que siempre puedas estar al tanto de lo que sucede en el mundo del
            cine. ¡Gracias por visitar nuestro sitio de películas! Esperamos que
            encuentres todo lo que buscas y que disfrutes navegando por nuestro
            sitio. Si tienes alguna pregunta o sugerencia, no dudes en
            contactarnos a través de nuestro formulario de contacto.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default About;
