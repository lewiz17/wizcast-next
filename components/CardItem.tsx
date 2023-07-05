import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { useEffect } from "react";
import { formatTitle } from "../utils/helpers";

type ITEM = {
  id: string | number;
  title: string;
  poster: string;
  rate: number;
};

const Card: React.FC<ITEM> = ({ id, title, poster, rate }: ITEM) => {
  return (
    <div className="w-full rounded shadow hover:opacity-90 mitem">
      <Rating rate={rate} />
      <Image
        src={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEs0lEQVR4nO2aXYhVVRTHzzg6TinlTE0aUhlBIEr2EhG9l0OZGURoRS+aPqQO5qsf9CQVPQRST71EBfUQFBIVWlH2Yfb1UtoYFFZEmA9Rt5lm9Cfrzn/DKs49Z+9z920q/MPlfuy911r77PW9b1Gcx/8UwDBwJ/AYcAA4BpwGJvWyz19pzOasBYaKfwOAQeB+4A3gDOmYBl4H7gPmz8YGLgAeBn50Qk0Ah4BdOpnl9sSBeXoN6Tcb2w28pTUBPwA77OH8U5u4DfjGCfAxsBG4uAGtRcAm4KijdwIY7bUaPe0YfgLckpH+auAzR39/9tMBlkhww+/AVqA/K5MZPv3AdqDlTntxLuJX67iR11mZhXA1z+uA4+I5bjJ0S3DEETwCXJpN2nreQ8B74m02uaQbmwjq9D6wILu09TIsAD50apZuM86wTZ2GeyJpnByXOK3Y38TFBsPuuU1E2kxLMq1OCXYhTmyNmN8HvAscBm7OIXgZgDFn/PUqBux0caI/Uo8DzgIvAFcWmQHMBT4Xn7EYAw9pR1SwAy7U/DNSRaQGj+R2EMCo6H9fmZspeWt7iATipoqGP4ArgOd1MoaTotmXaSN9zpNuqJr4piZtTCBup2iYcL/dIJvBuc4s9gNsFs3XquqJaWWk0QmgHbEIT/7t9znAA8pqg/08CyzNECgngalSOYF1YngwkfCA1v1ZYUN7nfs0O9oHLOxiM++I1pqywcc1uCuRqNUahqmaecuAF526fQfc08R+mHkwhkfLBq0ENdzRwC0apiPn3wh84Db0EXBTIs91WvtK2eDXGlzeIPVuu9+ENXNUjP3kXPczwOWR61do3bGywV80mJRXSai2Maesc8F0r1y34Td9r4zcloVr/s9lg+YJDAMNfHsbqRtxNK4BXnbqdiTSU05k24jWBjQKfFKVEMNqPWfdRhqpVjcbUfNhn3uIp1Xqzo0o+DqqViNj19rQ0+pPsKsHTZDg8dRsGM5h7MH9ru3lRpS+hKrP8LbVG4n87qpyvyEg7k7cR6F0wTCvYs5S4DmXUFpAvDuVV0xAtA6g4VCRcSOK/Kb3v2pOK2OKcnunZCwkjYsSCQdj/UuNoEZ1aCUZXgKuaroBl9yGpPGiogxqKBs2FV1sBLjW2VxoYNyaQrMTgC2ieaBq0r2adLTjpPJ1ITJbR/IJy4T13Vz6Q3XuNDH4fira6+uKpFA/RD9Bl6Kfcu70KWvl5NhASXfnZO01hFr7aOexcSHU6sgQVxWZwUyW/YV4bItZMOgMdHskk4PAt1Zf5BC65gEfj74Uct2KVmqw6gWA650dpl1lKGUITyCrrifKMaKmnOHJJgQG1f1AKcVsNLEXqoJE7/O7eRp2OxuuFUayS1sd+A6L94muL3x00TPu1Cy7R+pgE+PiaVn5slyEFzs1a6mhnCXIlbjYHc6wTZ0uy81k0DkA1FAezRixLdiFONE27J7evev2NRw76sVubvIvBtnBFpd2BFXKdlscczpj6ooHTCqq71HfaYVumwb0ss8rVRTt0dyQbIa0Y9ts/QPCmgAbrKGs/CoVU8qS18/KBspgDWXrxVrVBryq1P2U+1ONff7SylPNWdOxnjiP4r+Pc4rYJxbQhTQdAAAAAElFTkSuQmCC"
        }
        alt={title}
        width={50}
        height={50}
        className="play-icon"
      />
      <Link
        href={`/movie/${id}/${formatTitle(title)}`}
        style={{ width: "auto", height: "auto" }}
      >
        <Image src={poster} alt={title} width="220" height="270" priority />
      </Link>
    </div>
  );
};

export default Card;
