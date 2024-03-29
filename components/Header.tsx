import Link from "next/link";
import { CMS_NAME } from "../lib/constants";
import Navbar from "./Navbar";
import React, {
  Dispatch,
  ForwardedRef,
  Ref,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useSearch } from "../hooks/useSearch";
import { useMovies } from "../hooks/useMovies";
import debounce from "just-debounce-it";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

type Props = {
  handleData: (data: object) => void;
  handleLoading: (loading: boolean) => void;
  handlePage: number;
  handleTotalResults: (number) => void;
  currentMovie: string | string[];
  hideItems: boolean;
  handleSearch: (query: string) => void;
};

const Header: React.FC<Props> = ({
  handleData,
  handleLoading,
  handlePage,
  handleTotalResults,
  currentMovie,
  hideItems,
  handleSearch,
}) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { search, updateSearch } = useSearch();

  const [sort, setSort] = useState(false);
  const [page, setPage] = useState(0);

  const { movies, total, loading, getMovies } = useMovies({
    search,
    page,
    sort,
  });

  useEffect(() => {
    handleLoading(loading);
    handleData(movies);
    setPage(handlePage);
    handleTotalResults(total);
  }, [movies, loading, total, handlePage]);

  useEffect(() => {
    updateSearch("");
  }, [currentMovie]);

  const debouncedGetMovies = useCallback(
    debounce((search, page) => {
      getMovies({ search, page });
    }, 300),
    [getMovies, handlePage]
  );

  useEffect(() => {
    const toggle = document.querySelector(".toggle");
    const menuTop = document.querySelector(".top-menu");

    const handleToggle = () => {
      if (opened) {
        setOpened(false);
        menuTop.classList.add("xs:hidden", "sm:hidden");
        menuTop.classList.remove("mob-menu");
      } else {
        setOpened(true);
        menuTop.classList.remove("xs:hidden", "sm:hidden");
        menuTop.classList.add("mob-menu");
      }
    };

    toggle.addEventListener("click", handleToggle);

    return () => {
      toggle.removeEventListener("click", handleToggle);
    };
  }, [opened]);

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch, page);
  };

  return (
    <header className="w-full fixed z-50 bg-global py-1">
      <div className="container mx-auto flex items-center justify-between md:p-1">
        <h1 className="flex logo">
          <Link href="/" legacyBehavior>
            <a
              className="text-3xl font-bold tracking-tight leading-tight text-white"
              title="Lewiz"
            >
              <img
                src={"/wlogo.png"}
                width={60}
                height={60}
                alt="logo"
                loading="lazy"
              />
              <Logo />
            </a>
          </Link>
        </h1>
        <div className="toggle md:hidden sm:block xs:block">
          {!opened && (
            <svg
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-10"
            >
              <path
                fill="#ffffff"
                fillRule="evenodd"
                d="M19 4a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h16a1 1 0 0 1 1 1zm0 6a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h16a1 1 0 0 1 1 1zm-1 7a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2h16z"
              />
            </svg>
          )}
          {opened && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              className="w-12 h-10"
              fill="#ffffff"
            >
              <path
                stroke="#ffffff"
                d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
              />
            </svg>
          )}
        </div>
        <div className="top-menu md:flex xs:hidden sm:hidden md:gap-5 lg:md:gap-4">
          <Navbar position="header" hideItems={hideItems} />
          <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
