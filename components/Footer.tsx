import Link from "next/link";
import { CMS_NAME } from "../lib/constants";
import Navbar from "./Navbar";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { useModalContext } from "./ModalContext";

const Footer: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(0);
  const { openModal } = useModalContext();

  useEffect(() => {
    setCurrentDate(new Date().getFullYear());
  }, []);

  return (
    <footer className="bottom-0 w-full bg-global">
      <div className="container mx-auto py-8 px-4 flex flex-wrap justify-between items-center text-white">
        <span>
          WIZPELIS © {currentDate} - Ningún vídeo está alojado en nuestros
          servidores.
        </span>
        <div className="bottom-menu md:flex xs:hidden sm:hidden">
          <Navbar position="" hideItems={true} />
          <a
            className="open-modal ml-2 cursor-pointer w-[24px] hover:opacity-[0.8]"
            onClick={() => openModal()}
          >
            <img
              src="/ouch.png"
              title="Reportar enlace caido o notificar error"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
