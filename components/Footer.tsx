import Link from "next/link";
import { CMS_NAME } from "../lib/constants";
import Navbar from "./Navbar";
import Image from "next/image";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 w-full bg-global">
      <div className="container mx-auto py-8 px-4 flex flex-wrap justify-between items-center text-white">
        <h2 className="flex logo">
          <Link href="/" legacyBehavior>
            <a
              className="text-3xl font-bold tracking-tight leading-tight text-white"
              title="Lewiz"
            >
              <Image src={"/wlogo.png"} width={60} height={60} alt="logo" />
              <Logo />
            </a>
          </Link>
        </h2>
        <div className="bottom-menu md:flex xs:hidden sm:hidden">
          <Navbar position="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
