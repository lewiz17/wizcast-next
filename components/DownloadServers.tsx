import React, { useState, useEffect, useMemo } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "Ak7qrvvH4WKYxV2OgaeHAEg2a5eh16vE";

interface Embed {
  servername: string;
  link: string;
  type: string;
}

interface VideoData {
  file_id: string;
  video_language: string;
  sortedEmbeds: Embed[];
}

interface VideoLanguageButtonsProps {
  data?: VideoData[];
}

const decryptLink = (encryptedLinkBase64: string): string | null => {
  try {
    const encryptedData = CryptoJS.enc.Base64.parse(encryptedLinkBase64);
    const iv = CryptoJS.lib.WordArray.create(encryptedData.words.slice(0, 4));
    const encryptedBytes = CryptoJS.lib.WordArray.create(
      encryptedData.words.slice(4)
    );

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedBytes },
      CryptoJS.enc.Utf8.parse(SECRET_KEY),
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Error al desencriptar:", error);
    return null;
  }
};

const VideoLanguageButtons: React.FC<VideoLanguageButtonsProps> = ({ data = [] }) => {
  const [decryptedLinks, setDecryptedLinks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Usamos useMemo para estabilizar la referencia de normalizedData
  const normalizedData = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [JSON.stringify(data)]); // Dependencia basada en el contenido, no en la referencia

  useEffect(() => {
    // Solo ejecutar si hay datos
    if (normalizedData.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const processLinks = async () => {
      const links: Record<string, string> = {};
      
      for (const item of normalizedData) {
        try {
          const firstEmbed = item.sortedEmbeds?.[0];
          if (firstEmbed?.link) {
            const decryptedUrl = decryptLink(firstEmbed.link);
            if (decryptedUrl) {
              links[item.video_language] = decryptedUrl.replace("/e/", "/d/");
            }
          }
        } catch (error) {
          console.error(`Error procesando item ${item.file_id}:`, error);
        }
      }

      setDecryptedLinks(links);
      setLoading(false);
    };

    processLinks();
  }, [normalizedData]); // Ahora normalizedData es estable gracias a useMemo

  const handleClick = (e: React.MouseEvent, language: string) => {
    e.preventDefault();
    const link = decryptedLinks[language];
    
    if (link) {
      window.open(link, "_blank");
      
      setTimeout(() => {
        window.open(
          'https://www.profitableratecpm.com/tiww2i3s?key=6f0b0eb7e76c6ad53bceda6c8e977fab', 
          "_blank"
        );
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 p-4">
        <span>IDIOMAS:</span>
        <div>Cargando...</div>
      </div>
    );
  }

  if (normalizedData.length === 0) {
    return (
      <div className="flex gap-4 p-4">
        <span>IDIOMAS:</span>
        <div>No hay idiomas disponibles</div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4">
      <span>IDIOMAS:</span>
      {normalizedData.map((item) => (
        <div key={item.file_id} className="flex flex-col items-start">
          <a
            href={decryptedLinks[item.video_language] || "#"}
            onClick={(e) => handleClick(e, item.video_language)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-6 font-medium text-black duration-500"
          >
            <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
              DESCARGAR {item.video_language}
            </div>
            <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <svg 
                width="15" 
                height="15" 
                viewBox="0 0 15 15" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6"
              >
                <path 
                  d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" 
                  fill="currentColor" 
                  fillRule="evenodd" 
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default VideoLanguageButtons;