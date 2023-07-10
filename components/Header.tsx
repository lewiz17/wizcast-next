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
import Image from "next/image";
import { useSearch } from "../hooks/useSearch";
import { useMovies } from "../hooks/useMovies";
import debounce from "just-debounce-it";
import Logo from "./Logo";

type Props = {
  handleData: (data: object) => void;
  handleLoading: (loading: boolean) => void;
  currentMovie: string | string[];
};

const Header: React.FC<Props> = ({
  handleData,
  handleLoading,
  currentMovie,
}) => {
  const [opened, setOpened] = useState(false);
  const { search, updateSearch } = useSearch();

  const [sort, setSort] = useState(false);

  const { movies, loading, getMovies } = useMovies({ search, sort });

  useEffect(() => {
    handleData(movies);
    handleLoading(loading);
  }, [movies, loading]);

  useEffect(() => {
    updateSearch("");
  }, [currentMovie]);

  //console.log("desde header", currentMovie);

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
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
    debouncedGetMovies(newSearch);
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
              <Image src={"/wlogo.png"} width={60} height={60} alt="logo" />
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
          <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <input
              className="peer h-10 w-full outline-none text-sm text-black pr-2"
              type="search"
              id="search"
              onChange={handleChange}
              value={search}
              name="query"
              placeholder="Vengadores, Spiderman..."
            />
          </div>
          <Navbar position="header" />
        </div>
      </div>
    </header>
  );
};

export default Header;
