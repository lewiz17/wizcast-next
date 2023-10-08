import React, { useEffect, useState } from "react";
import { SkeletonCard } from "./SkeletonCard";

function GamesHub() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/games.json");
        const games = await response.json();

        setApiData(games);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filterGamesByPlatform = (data, platform) => {
    return (
      data?.flatMap((item) => {
        const platformData = item?.game_offers?.filter(
          (offer) => offer.platform === platform
        );
        return platformData?.length > 0
          ? [
              {
                ...item,
                game_offers: platformData,
              },
            ]
          : [];
      }) || []
    );
  };

  const xboxGames = filterGamesByPlatform(apiData, "xbox");
  const playGames = filterGamesByPlatform(apiData, "play");
  const pcGames = filterGamesByPlatform(apiData, "pc");

  const GameItem = ({ gameData }) => {
    return (
      <li className="item-game">
        {gameData.game_offers[0].discount && (
          <span className="rib-discount">
            -{gameData.game_offers[0].discount}%
          </span>
        )}
        <a
          href={gameData.game_offers[0].url}
          target="_blank"
          title={gameData.title}
        >
          <img src={gameData.cover_url} loading="lazy" alt={gameData.title} />
          <button className="btn-offer text-md hidden">Ver oferta</button>
          <div className="info mt-2">
            <span>{gameData.title}</span>
            <div className="prices flex gap-x-2">
              {gameData.game_offers[0].price && (
                <>
                  <span className="current">
                    desde: <strong>${gameData.game_offers[0].price}</strong>
                  </span>
                  {gameData?.game_offers[0]?.compare_price && (
                    <span className="line-through opacity-[0.8]">
                      ${gameData.game_offers[0].compare_price}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </a>
      </li>
    );
  };

  return (
    <div className="w-full my-5">
      <h2 className="text-2xl xs:px-[3%] font-bold text-white tracking-tight leading-tight mt-3">
        Ofertas en Videojuegos
      </h2>
      {loading ? (
        // Muestra un esqueleto o indicador de carga para cada elemento de apiData
        apiData &&
        apiData.map((_, i) => (
          <div key={i}>
            <SkeletonCard />
          </div>
        ))
      ) : (
        <div className="games-hub flex flex-col gap-y-3 my-5">
          {xboxGames.length > 0 && (
            <h3 className="text-md font-bold text-white tracking-tight leading-tight">
              Juegos Xbox One / Xbox Series - {xboxGames.length} Ofertas
              <span className="mx-2 inline-flex w-3 h-3 bg-[#48ff00] rounded-full animate-pulse"></span>
            </h3>
          )}

          <ul className="gameList xbox-games">
            {xboxGames.map((item, i) => (
              <GameItem key={i} gameData={item} />
            ))}
          </ul>

          {playGames.length > 0 && (
            <h3 className="text-md font-bold text-white tracking-tight leading-tight">
              Juegos PS4 / PS5 - {playGames.length} Ofertas
              <span className="mx-2 inline-flex w-3 h-3 bg-[#48ff00] rounded-full animate-pulse"></span>
            </h3>
          )}

          <ul className="gameList play-games">
            {playGames.map((item, i) => (
              <GameItem key={i} gameData={item} />
            ))}
          </ul>

          {pcGames.length > 0 && (
            <h3 className="text-md font-bold text-white tracking-tight leading-tight">
              Juegos PC / Rockstar / Steam / Epic Games - {pcGames.length}{" "}
              Ofertas
              <span className="mx-2 inline-flex w-3 h-3 bg-[#48ff00] rounded-full animate-pulse"></span>
            </h3>
          )}

          <ul className="gameList pc-games">
            {pcGames.map((item, i) => (
              <GameItem key={i} gameData={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GamesHub;
