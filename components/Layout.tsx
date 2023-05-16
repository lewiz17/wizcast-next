import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Meta />
      <Header />

      <main className="container mx-auto flex-grow">
        {children}
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
