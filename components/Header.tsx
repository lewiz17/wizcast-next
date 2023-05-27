import Link from "next/link";
import { CMS_NAME } from "../lib/constants";
import Navbar from "./Navbar";
import { useState } from "react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      router.push(`/result/?s=${query}`);
    }
  };

  return (
    <header className="bg-gray shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div>
          <Link href="/" legacyBehavior>
            <a
              className="text-3xl font-bold tracking-tight leading-tight text-white"
              title="Lewiz"
            >
              {CMS_NAME}
            </a>
          </Link>
        </div>
        <div className="top-menu">
          <input
            type="text"
            value={query}
            placeholder="Buscar una Pelicula"
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleSearch}
            className="rounded shadow"
          />
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
