import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div>
          <Link href="/" legacyBehavior>
            <a className="text-3xl font-bold tracking-tight leading-tight">Mi Sitio</a>
          </Link>
        </div>

        <nav className="flex items-center justify-end space-x-4">
        <Link href="/about" legacyBehavior>
            <a className="text-lg font-medium leading-tight hover:text-blue">Acerca</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="text-lg font-medium leading-tight hover:text-blue">Contacto</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
