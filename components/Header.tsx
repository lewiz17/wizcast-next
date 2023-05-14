import Link from "next/link";
import { CMS_NAME, LINKEDIN_URL } from "../lib/constants";

const Header: React.FC = () => {
  return (
    <header className="bg-gray shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div>
          <Link href="/" legacyBehavior>
            <a className="text-3xl font-bold tracking-tight leading-tight text-white" title="Lewiz">{CMS_NAME}</a>
          </Link>
        </div>

        <nav className="flex items-center justify-end space-x-4">
        <Link href="/about" legacyBehavior>
            <a className="text-lg font-medium leading-tight hover:text-blue text-white">Acerca</a>
          </Link>
          <Link href={LINKEDIN_URL} legacyBehavior>
            <a className="text-lg font-medium leading-tight hover:text-blue text-white" target="_blank" rel="noopener noreferrer">Contacto</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
