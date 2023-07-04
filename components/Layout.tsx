import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";
import { useRouter } from "next/router";
import Result from "./Result";

type movies = {
  id: string | number;
  title: string;
  poster: string;
  rate: number;
}[];

type loading = boolean;

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [movieData, setmovieData] = useState<movies>([]);
  const [loading, setLoading] = useState<loading>(false);
  const [isResult, setisResult] = useState<boolean>(true);
  const [currentId, setCurrentID] = useState<string | string[]>("");

  const routerID = router?.query?.id ? router.query.id : "";

  useEffect(() => {
    if (routerID != "") {
      setisResult(false);
    }
  }, [routerID]);

  useEffect(() => {
    setisResult(true);
  }, [movieData]);

  return (
    <div className="flex flex-col min-h-screen">
      <Meta />
      <Header
        handleData={setmovieData}
        handleLoading={setLoading}
        currentMovie={routerID}
      />

      <main className="container mx-auto flex-grow">
        {movieData?.length > 0 && isResult ? (
          <Result movies={movieData} loading={loading} />
        ) : (
          children
        )}
        <div className="grid grid-cols-1 gap-5 mb-8">
          <p>
            Wizpelis, ver o descargar películas full hd gratis en 1 LINK
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
