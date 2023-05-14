import Link from "next/link";
import { CMS_NAME } from "../lib/constants";

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 w-full bg-gray">
      <div className="container mx-auto py-8 px-4 flex flex-wrap justify-between items-center text-white">
        <div className="flex-shrink-0 mr-6">
          <Link href="/" legacyBehavior>
            <a className="text-3xl font-bold tracking-tight leading-tight">
              {CMS_NAME}
            </a>
          </Link>
        </div>
        <nav className="flex flex-wrap justify-center lg:justify-end items-center -mx-4">
          <div className="px-4 py-2">
            <Link href="/about" legacyBehavior>
              <a className="text-lg font-medium leading-tight hover:text-blue">
                Acerca
              </a>
            </Link>
          </div>
          <div className="px-4 py-2">
            <Link href="/contact" legacyBehavior>
              <a className="text-lg font-medium leading-tight hover:text-blue">
                Contacto
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
