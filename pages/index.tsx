import Container from "../components/Container";
import Layout from "../components/Layout";
import Card from "../components/CardItem";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

type ITEM = {
  results: {
    original_title: string;
    poster_path: string;
  }[];
};

type ItemProps = {
  items: ITEM[];
};

function fillMovies(items: ITEM[]) {
  return items.flatMap((item) => item.results.map((result) => result.original_title));
}
function fillPosters(items: ITEM[]) {
  return items.flatMap((item) => item.results.map((result) => result.poster_path));
}

export default function ListItems({ items }: ItemProps) {
  const [listMovies, setListMovies] = useState<string[]>([]);
  const [listPosters, setListPosters] = useState<string[]>([]);

  useEffect(() => {
    const movies = fillMovies(items);
    const posters = fillPosters(items);
    setListMovies(movies);
    setListPosters(posters);

    console.log('posters', listPosters);
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME} - Estrenos ${new Date().getFullYear()}`}</title>
        </Head>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-32 mt-10">
            {listMovies.flatMap((movie, i) => (
              <Card title={movie} key={i} poster={`https://www.themoviedb.org/t/p/w440_and_h660_face/${listPosters[i]}`} />
            ))}
          </div>
        </Container>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ItemProps> = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654`
  );
  const items = await res.json();

  return {
    props: {
      items: [items],
    },
  };
};
