import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { q } = req.query;

  try {
    // Realiza una solicitud HTTP a TMDb para obtener las series más populares
    const response: AxiosResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
        query: q,
        language: 'es-MX' // Reemplaza con tu propia API key de TMDb
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
