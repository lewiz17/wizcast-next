import { useState } from "react";
import Result from "./result";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";
import { useRouter } from "next/router";

type movies = {
  id: string | number;
  title: string;
  poster: string;
}[];

type loading = boolean;

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [movieData, setmovieData] = useState<movies>([]);
  const [loading, setLoading] = useState<loading>(false);
  const router = useRouter();
  const { result } = router.query;

  return (
    <div className="flex flex-col min-h-screen">
      <Meta />
      <Header handleData={setmovieData} handleLoading={setLoading} />

      <main className="container mx-auto flex-grow">
        {movieData?.length > 0 && result != "" ? (
          <Result movies={movieData} loading={loading} />
        ) : (
          children
        )}
        <div className="grid grid-cols-1 gap-5 mb-8">
          <p>
            Wizstars, ver o descargar películas full hd gratis en 1 LINK
            Descargar películas. Ver películas online. Cine en casa gratis.
            Películas online y para descargar en 1 link. Excelente calidad brrip
            (720p/1080p)
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
