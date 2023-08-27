import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";

type SeasonProps = {
  id: number;
  count: number;
};

const SeasonBox: React.FC<SeasonProps> = ({ count, id }) => {
  const [currentSeason, setSeason] = useState<number | null>(1); // Asegura que currentSeason sea de tipo number o null
  const router = useRouter();
  const numTemps = Array.from({ length: count }, (_, i) => {
    const seasonNumber = i + 1;
    return (
      <option
        key={i}
        className="item-view flex justify-center"
        value={seasonNumber}
      >
        Temporada {seasonNumber}
      </option>
    );
  });

  useEffect(() => {
    if (router.query.season && typeof router.query.season === "string") {
      const seasonValue = parseInt(router.query.season);
      if (!isNaN(seasonValue) && seasonValue > 0) {
        setSeason(seasonValue);
      } else {
        setSeason(1);
      }
    }
  }, [router.query.season]);

  const handleSeason: ChangeEventHandler<HTMLSelectElement> = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSeason(parseInt(event.target.value));
  };

  return (
    <div className="season-wrapper mt-2">
      <div className="flex">
        <span className="bg-white text-black flex items-center px-2 font-bold">
          Seleccionar Temporada:
        </span>
        <select
          name="seasonOptions"
          onChange={handleSeason}
          className="text-black flex items-center"
          value={currentSeason || ""}
        >
          {numTemps}
        </select>
      </div>

      <div
        className={`season-content ${
          router.asPath.includes("episode") ? "h-auto" : "h-[27em]"
        }  mt-4`}
      >
        <iframe
          src={`/serie/${id}/season/${currentSeason}`}
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
};

export default SeasonBox;
