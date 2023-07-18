import Link from "next/link";
import { genres } from "../data/genres";
import { formatNames } from "../utils/helpers";

type NavProps = {
  position?: string;
};

const Navbar: React.FC<NavProps> = ({ position }: NavProps) => {
  return (
    <nav className="flex items-center justify-end space-x-4">
      <Link href={"/"} legacyBehavior>
        <a className="text-lg leading-tight hover:opacity-[0.8] text-white">
          Inicio
        </a>
      </Link>
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
      <Link href="/about" legacyBehavior>
        <a className="text-lg leading-tight hover:opacity-[0.8] text-white">
          Acerca
        </a>
      </Link>
      <Link
        title="Mantengamos la plataforma activa, Envia tu grano de arena aquí"
        href={"/donate"}
        className="ml-2 text-black font-bold bg-white rounded-full py-2 px-4 hover:opacity-[0.8]"
      >
        Apoya
      </Link>
    </nav>
  );
};

export default Navbar;
