import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-end space-x-4">
      <Link href="/?list=popular" legacyBehavior>
        <a className="text-lg font-medium leading-tight hover:text-blue text-white">
          Populares
        </a>
      </Link>
      <Link href="/about" legacyBehavior>
        <a className="text-lg font-medium leading-tight hover:text-blue text-white">
          Acerca
        </a>
      </Link>
      <Link href={"/"} legacyBehavior>
        <a className="text-lg font-medium leading-tight hover:text-blue text-white">
          Contacto
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;