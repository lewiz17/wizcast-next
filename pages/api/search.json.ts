import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


export interface ITEM_SEARCH {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  title: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
  release_date: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { q } = req.query;

  try {
    // Realiza una solicitud HTTP a TMDb para obtener las series más populares
    const response: AxiosResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
        query: q,
        language: 'es-MX',
        page: 1,
        per_page: 30
      }
    });

    // Extrae los datos de las series más populares de la respuesta
    const movie: string[] = response.data.results;

    // Responde con los datos en formato JSON
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    // En caso de error, puedes manejarlo aquí y responder con un mensaje de error
    res.status(500).json({ error: 'Ocurrió un error al obtener las series populares' });
  }
}


export async function searchGeneral(query) {

    // Realiza una solicitud HTTP a TMDb para obtener las series más populares
    const response: AxiosResponse = await axios.get('https://api.themoviedb.org/3/search/multi', {
      params: {
        api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
        query: query,
        language: 'es-MX',
        page: 1
      }
    });

    const items: ITEM_SEARCH[] = response.data.results;

    const mapItems =  items.map((item) => {
      return {
          id: item.id,
          title: item.name === undefined ? item.title : item.name,
          poster: item.poster_path,
          rate: item.vote_average,
          type: item.media_type,
          date: item?.first_air_date?.split('-')[0] || item?.release_date?.split('-')[0]
      }
    })

    const itemsJSON = {
      query: query,
      results: mapItems
    }

    return itemsJSON;
    
}
