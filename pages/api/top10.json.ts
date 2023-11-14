import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export async function getMovies() {
    try {
        // Realiza una solicitud HTTP a TMDb para obtener las series más populares
        const response: AxiosResponse = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
            language: 'es-MX' // Reemplaza con tu propia API key de TMDb
          }
        });
    
        // Extrae los datos de las series más populares de la respuesta
        const popularMovies: Movie[] = response.data.results;
        const topMovies = popularMovies.slice(0,10);
    
       return topMovies;
      } catch (error) {
        console.error(error);
      }
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const jsonData = await getMovies();
        res.status(200).json(jsonData)
      } catch (error) {
        console.error(error);
        return { error: "Error en servidor" }
      }
}