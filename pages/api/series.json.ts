import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type SerieID = {
  id: number
  imdb_id: string
  freebase_mid: any
  freebase_id: any
  tvdb_id: number
  tvrage_id: any
  wikidata_id: string
  facebook_id: any
  instagram_id: any
  twitter_id: any
}
interface SerieGenre {
  id?: number;
  name?: string;
}
/*
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Realiza una solicitud HTTP a TMDb para obtener las series más populares
    const response: AxiosResponse = await axios.get('https://api.themoviedb.org/3/tv/top_rated', {
      params: {
        api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
        language: 'es-MX' // Reemplaza con tu propia API key de TMDb
      }
    });

    // Extrae los datos de las series más populares de la respuesta
    const popularSeries: string[] = response.data.results;

    // Responde con los datos en formato JSON
    res.status(200).json(popularSeries);
  } catch (error) {
    console.error(error);
    // En caso de error, puedes manejarlo aquí y responder con un mensaje de error
    res.status(500).json({ error: 'Ocurrió un error al obtener las series populares' });
  }
}*/

export async function getSerie(id) {

  // Realiza una solicitud HTTP a TMDb para obtener los detalles de una película
  const dataSerie: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
    params: {
      api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
      language: 'es-MX' // Reemplaza con tu propia API key de TMDb
    }
  });

  // Extrae los datos de la primera respuesta
  const nameSerie: string = dataSerie.data.name;
  const overview: string = dataSerie.data.overview;
  const poster: string = dataSerie.data.poster_path;
  const date_release: string = dataSerie.data.last_air_date;
  const rating: number = dataSerie.data.vote_average;
  const genres: SerieGenre[] = dataSerie.data.genres;
  const seasons: number = dataSerie.data.number_of_seasons;
  const totalEpisodes: number = dataSerie.data.number_of_episodes;
  const lastEpisode: number = dataSerie.data.last_episode_to_air.episode_number;

  const dataIDs: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/external_ids`, {
    params: {
      api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654'
    }
  });


  const serieJSON = {
    id,
    serieID: dataIDs.data?.imdb_id,
    title: nameSerie,
    overview,
    poster,
    rating,
    date_release,
    genres: genres,
    lastEpisode: lastEpisode,
    seasons,
    totalEpisodes
  };

  return serieJSON;
}

type episode = {
  id: number
  name: string
  still_path: string
  episode_number: number
}

export async function getSeasonSerie(ttid, numSeason) {

  // Realiza una solicitud HTTP a TMDb para obtener los detalles de una película
  const seasonSerie: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/tv/${ttid}/season/${numSeason}`, {
    params: {
      api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
      language: 'es-MX' // Reemplaza con tu propia API key de TMDb
    }
  });

  // Extrae los datos de la primera respuesta
  const seasonID: number = seasonSerie.data.id;

  const maxEpisodes: number = (await getSerie(ttid)).lastEpisode;

  const episodes: episode[] = seasonSerie.data.episodes;

  const mapEpisodes =  episodes.map((ep) => {
    return {
        id: ep.id,
        name: ep.name,
        poster: ep.still_path,
        epnumber: ep.episode_number
    }
  })

  const seasonJSON = {
    id: seasonID,
    episodes: mapEpisodes
  }

  return seasonJSON;
}



export async function getSourcesEpisode(id, season, episode) {


  let imdbID = (await getSerie(id)).serieID;
  let nameSerie = (await getSerie(id)).title;
  let episodes = (await getSeasonSerie(id, season)).episodes;

  const currentEpisode = episodes.filter((v, i) => v.epnumber == episode );

  let formatEpisode = episode <=9 ? `0${episode}`: episode;

  let numEpisode = `${season}x${formatEpisode}`;

  const dataServers: AxiosResponse = await axios.get(`https://api-m1.vercel.app/api/${imdbID}-${numEpisode}`);

  let tempName = nameSerie.split(" ").length > 1 ? nameSerie.split(" ")[1] : nameSerie;
  let tempName2 = nameSerie.split(" ").length > 1 ? nameSerie.split(" ")[0]+nameSerie.split(" ")[1] : tempName;
  let tempName3 = nameSerie.split(" ").length >= 2 ? nameSerie.split(" ")[0]+nameSerie.split(" ")[1].slice(0,1)+nameSerie.split(" ")[2] : tempName2;
  let tempName4 = nameSerie.split(" ").length > 2 ? nameSerie.split(" ")[0].slice(0,1)+nameSerie.split(" ")[1].slice(0,1)+nameSerie.split(" ")[2].slice(0,1) : tempName3;
  let tempName5 = imdbID == "tt0944947" ? 'got' : tempName4;
  let tempName6 = imdbID == "tt4644488" ? 'dballsuper' : tempName4;
  let tempName7 = imdbID == "tt0388629" ? `${imdbID}-1x${episode}` : tempName4; //one piece


  const dataServersFallback: AxiosResponse = dataServers.data.length == 0 ? await axios.get(`https://api-m1.vercel.app/api/${tempName}-${numEpisode}`) : dataServers;

  const dataServersFallback2: AxiosResponse = dataServersFallback.data.length == 0 ? await axios.get(`https://api-m1.vercel.app/api/${tempName2}-${numEpisode}`) : dataServersFallback;

  const dataServersFallback3: AxiosResponse = dataServersFallback2.data.length == 0 ? await axios.get(`https://api-m1.vercel.app/api/${tempName3}-${numEpisode}`) : dataServersFallback2;

  const dataServersFallback4: AxiosResponse = dataServersFallback3.data.length == 0 ? await axios.get(`https://api-m1.vercel.app/api/${tempName4}-${numEpisode}`) : dataServersFallback3;

  const dataServersFallback5: AxiosResponse = dataServersFallback4.data.length == 0 ? await axios.get(`https://api-m1.vercel.app/api/${tempName5}-${numEpisode}`) : dataServersFallback4;

  const dataServersFallback6: AxiosResponse = dataServersFallback5.data.length == 0 ? await axios.get(`https://api-m1.vercel.app/api/${tempName6}-${numEpisode}`) : dataServersFallback5;

  const dataServersFallback7: AxiosResponse = dataServersFallback6.data.length == 0 ? await axios.get(`https://api-m1.vercel.app/api/${tempName7}`) : dataServersFallback6;

  
  const servers: object[] = dataServersFallback7.data;

  const links: object = servers.length > 0 ? {
    vip: servers[0],
    fast: servers[1],
    normal: servers[2],
    slow: servers[3]
  }: [];

  const videosSources = {
    id,
    episodeData: currentEpisode,
    sources:links 
  };

  return videosSources;
}




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, season, episode } = req.query;

  try {
    const jsonData = await getSourcesEpisode(id, season, episode);
    res.status(200).json(jsonData)
  } catch (error) {
    console.error(error);
    return { error: "Error en servidor" }
  }
}
