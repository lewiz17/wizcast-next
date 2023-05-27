import Head from "next/head";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../components/CardItem";

const Result: React.FC = () => {

  const [result, setResult] = useState([]);
  const router = useRouter();
  const { s } = router.query;

  useEffect(() => {
    onSearch();
  }, [s])

  const onSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&query=${s}`
      );
      const result = await response.json();
      setResult(result.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>{`Resultados ${s}`}</title>
      </Head>
      <Container>
      <h2 className="text-2xl font-bold tracking-tight leading-tight my-2">Top Estrenos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-8">
            {result.flatMap((movie, i) => (
              <Card
                id={movie.id}
                title={movie.original_title}
                key={movie.id}
                poster={movie.poster_path !== null ? `https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}` : 'https://placehold.co/400x600/111111/FFFFFF/png?text=Wizstar'}
              />
            ))}
          </div>
      </Container>
    </Layout>
  );
};

export default Result;
