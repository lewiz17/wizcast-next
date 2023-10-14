import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { searchGeneral } from "../pages/api/search.json";
import { SkeletonCard } from "./SkeletonCard";

const Result = dynamic(() => import("./Result"), {
  loading: () => <SkeletonCard />,
});

type ITEM_SEARCH = {
  id: string | number;
  title: string;
  poster: string;
  rate: number;
  type: string;
  date: string;
};

type loading = boolean;

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [movieData, setmovieData] = useState<ITEM_SEARCH[]>([]);
  const [loading, setLoading] = useState<loading>(false);
  const [isResult, setisResult] = useState<boolean>(true);
  const [numPage, setNumPage] = useState<number>(1);
  const [total, setTotalResult] = useState<number>(0);
  const [showLoad, setShowLoad] = useState<boolean>(true);
  const [hideMenuItems, setHideItems] = useState(false);

  const routerID = router?.query?.id ? router.query.id : "";

  const handleLoadMore = (e) => {
    e.preventDefault();
    // increment pagee
    total == numPage ? setShowLoad(false) : setNumPage(numPage + 1);
  };

  useEffect(() => {
    router.pathname.includes("serie")
      ? setHideItems(true)
      : setHideItems(false);
  }, [router.pathname]);

  useEffect(() => {
    if (routerID != "") {
      setisResult(false);
    }
  }, [routerID]);

  useEffect(() => {
    setisResult(true);
  }, [movieData]);

  const handleSearch = async (query) => {
    const media = await searchGeneral(query);
    setmovieData(media.results);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Meta />
      <Header
        handleData={setmovieData}
        handleLoading={setLoading}
        handlePage={numPage}
        handleTotalResults={setTotalResult}
        currentMovie={routerID}
        hideItems={hideMenuItems}
        handleSearch={handleSearch}
      />
      <main className="container mx-auto my-[4rem] flex-grow px-4">
        {movieData?.length > 0 && isResult ? (
          <>
            <Result items={movieData} loading={loading} />
          </>
        ) : (
          children
        )}
        <div className="mt-5 container mx-auto">
          <p>
            Wizpelis, ver o descargar películas full hd gratis en 1 LINK
            Descargar películas. Ver películas online. Cine en casa gratis.
            Películas online y para descargar en 1 link. Excelente calidad brrip
            (720p/1080p)
          </p>
          <p>
            <span>
              Haz tu aporte al proyecto, Apoyanos
              <Link
                title="Mantengamos la plataforma activa, Envia tu grano de arena aquí"
                href={"/donate"}
                className="ml-2 text-black font-bold bg-white rounded-full py-2 px-4 hover:opacity-[0.8]"
              >
                Aquí
              </Link>
            </span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
