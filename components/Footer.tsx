import Link from "next/link";
import { CMS_NAME } from "../lib/constants";
import Navbar from "./Navbar";

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
        <Navbar />
      </div>
    </footer>
  );
};

export default Footer;
