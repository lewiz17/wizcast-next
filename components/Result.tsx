import { Ref, useEffect } from "react";
import Card from "./CardItem";
import { useRouter } from "next/router";

type ITEM_SEARCH = {
  id: string | number;
  title: string;
  poster: string;
  rate: number;
  type: string;
};

type Loading = boolean;

type Props = {
  items: ITEM_SEARCH[];
  loading: Loading;
};

const Result: React.FC<Props> = ({ items, loading }) => {
  return (
    <div className="container mx-auto result-wrap my-10">
      <h2 className="text-2xl font-bold tracking-tight leading-tight my-2 text-white">
        Resultados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-8">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          items.flatMap((item, i) => (
            <Card
              id={item.id}
              title={item.title}
              key={i}
              poster={
                item.poster !== null
                  ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster}`
                  : "/wlogo.png"
              }
              rate={item.rate}
              type={item.type}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Result;
