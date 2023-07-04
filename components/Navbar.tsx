import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-end space-x-4">
      <Link href="/?list=popular" legacyBehavior>
        <a className="text-lg font-medium leading-tight hover:text-blue text-white">
          Populares
        </a>
      </Link>
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
