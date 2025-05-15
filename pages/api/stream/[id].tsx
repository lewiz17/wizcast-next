import axios from "axios";
import * as cheerio from "cheerio";
import CryptoJS from "crypto-js";

const STREAM_API_KEY = "13031dso6r3qd3umz5zee";
const STREAM_CLONE_API = "https://streamhgapi.com/api/file/clone";
const SECRET_KEY = "Ak7qrvvH4WKYxV2OgaeHAEg2a5eh16vE";

// Desencripta enlace en base64 con AES-256-CBC
function decryptLink(encryptedLinkBase64, secretKey) {
  try {
    const encryptedData = CryptoJS.enc.Base64.parse(encryptedLinkBase64);
    const iv = CryptoJS.lib.WordArray.create(encryptedData.words.slice(0, 4));
    const encryptedBytes = CryptoJS.lib.WordArray.create(
      encryptedData.words.slice(4)
    );

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedBytes },
      CryptoJS.enc.Utf8.parse(secretKey),
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
}

function encodeBase64(str) {
  return Buffer.from(str, "utf-8").toString("base64");
}

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  const url = `https://embed69.org/f/${id}`;

  console.log(url)

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const scripts = $("script").toArray();

    let dataLink = null;

    for (const script of scripts) {
      const scriptText = $(script).html();
      if (!scriptText) continue;

      const startIndex = scriptText.indexOf("const dataLink =");
      if (startIndex !== -1) {
        const jsonStart = scriptText.indexOf("[", startIndex);
        const jsonEnd = scriptText.indexOf("];", jsonStart) + 1;
        const jsonString = scriptText.slice(jsonStart, jsonEnd);
        dataLink = JSON.parse(jsonString);
        break;
      }
    }

    if (!dataLink) {
      return res.status(404).json({ error: "dataLink no encontrado" });
    }

    for (const item of dataLink) {
      for (const embed of item.sortedEmbeds) {
        if (embed.servername === "streamwish") {
          try {
            const decryptedUrl = decryptLink(embed.link, SECRET_KEY);

            if (!decryptedUrl) continue;

            const fileCodeMatch = decryptedUrl.match(/\/([^/]+)$/);
            if (!fileCodeMatch) continue;

            const fileCode = fileCodeMatch[1];

            const cloneRes = await axios.get(
              `${STREAM_CLONE_API}?key=${STREAM_API_KEY}&file_code=${fileCode}`
            );

            const newUrl = cloneRes.data?.result?.url;

            if (newUrl) {
              embed.link = encodeBase64(newUrl);
            }
          } catch (err) {
            console.warn(`❌ Error procesando streamwish embed:`, err.message);
          }
        }
      }
    }

    res.status(200).json(dataLink);
  } catch (err) {
    console.error("❌ Error general:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
