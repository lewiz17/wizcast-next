import Link from "next/link";
import { genres } from "../data/genres";
import { formatNames } from "../utils/helpers";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-end space-x-4">
      <div className="select-item group relative cursor-pointer">
        <span className="text-lg font-medium leading-tight hover:text-blue text-white pb-3">
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
      </div>
      <Link href={"https://wizcast.netlify.app"} legacyBehavior>
        <a className="text-lg font-medium leading-tight hover:text-blue text-white">
          Canales
        </a>
      </Link>
      <Link href="/about" legacyBehavior>
        <a className="text-lg font-medium leading-tight hover:text-blue text-white">
          Acerca
        </a>
      </Link>
      <Link href={"https://ko-fi.com/wiz2023"} legacyBehavior>
        <a className="text-lg font-medium leading-tight hover:text-blue text-white">
          Apóyame
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;
