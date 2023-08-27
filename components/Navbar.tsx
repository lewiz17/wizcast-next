import Link from "next/link";
import { genres } from "../data/genres";
import { formatNames } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type NavProps = {
  position?: string;
  hideItems: boolean;
};

const Navbar: React.FC<NavProps> = ({ position, hideItems }: NavProps) => {
  return (
    <nav className="flex items-center justify-end space-x-4">
      <Link href={"/"} legacyBehavior>
        <a className="text-lg leading-tight hover:opacity-[0.8] text-white">
          Inicio
        </a>
      </Link>
      <Link href={"/series"} legacyBehavior>
        <a className="text-lg leading-tight hover:opacity-[0.8] text-white">
          Series
        </a>
      </Link>
      {!hideItems && (
        <div className="select-item group relative cursor-pointer">
          {position === "header" ? (
            <>
              <span className="text-lg leading-tight hover:opacity-[0.8] text-white pb-3">
                Generos
              </span>
              <ul className="genres hidden group-hover:block absolute py-2 rounded bg-white mt-2 h-[500px] overflow-y-auto">
                {genres.map((genre) => {
                  return (
                    <li
                      key={genre.id}
                      className="text-global hover:bg-global hover:text-white my-2 cursor-pointer"
                    >
                      <Link
                        className="block px-4 py-2"
                        href={`/genre/${genre.id}/${formatNames(genre.name)}`}
                      >
                        {genre.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            ""
          )}
        </div>
      )}

      <Link href="/about" legacyBehavior>
        <a className="text-lg leading-tight hover:opacity-[0.8] text-white">
          Acerca
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;
