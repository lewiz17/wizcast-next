import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface Video {
  type: string;
  key: string;
}

interface MovieRate {
  id: string | number;
  vote_average: number;
}
interface MovieGenre {
  id?: number;
  name?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
      // Realiza una solicitud HTTP a TMDb para obtener los detalles de una película
      const dataMovie: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
          language: 'es-MX' // Reemplaza con tu propia API key de TMDb
        }
      });

      // Extrae los datos de la primera respuesta
      const movieId: number = dataMovie.data.id;
      const movieTitle: string = dataMovie.data.title;
      const overview: string = dataMovie.data.overview;
      const poster: string = dataMovie.data.poster_path;
      const duration: number = dataMovie.data.runtime;
      const date_release: string = dataMovie.data.release_date;
      const imdbID: string = dataMovie.data.imdb_id;
      const rating: number = dataMovie.data.vote_average;
      const genres: MovieGenre[] = dataMovie.data.genres;

      // Utiliza los datos de la primera respuesta en la siguiente solicitud a otra API
      const dataServers: AxiosResponse = await axios.get(`https://api-m1.vercel.app/api/${imdbID}`);

      const servers: object[] = dataServers.data;

      const links = servers.length > 0 ? {
        vip: servers[0].toString(),
        fast: servers[1].toString(),
        normal: servers[2].toString(),
        slow: servers[3].toString()
      }: [];

      const dataVideos: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: {
          api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654'
        }
      });
      const videos: Video[] = dataVideos.data.results.length > 0 ? dataVideos.data.results : [];
      const trailer: Video | undefined = videos && videos.length > 0 ? videos.find((video) => video.type === 'Trailer') : undefined;
      const trailerKey = trailer ? trailer.key : "";

      const genresIDs: number[] = genres && genres.map(g => g.id);


      const dataRelates: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&release_date.gte=2000-01-01&with_genres=${genresIDs.join(',')}`, {
        params: {
          api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
          language: 'es-MX'
        }
      });

      const related: MovieRate[] = dataRelates.data.results.length> 0 ? dataRelates.data.results.slice(0,10): [];
      const relatedFiltered: MovieRate[] = related && related.filter(m => m.vote_average > 6.0 && m.id != id);

      const movieCast: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: {
          api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
          language: 'es-MX'
        }
      })

      const castData: object[] = movieCast.data.cast.length>0 ? movieCast.data.cast.slice(0,6).map(p => {
        return {
          "id": p.id,
          "name": p.name,
          "profile_url": p.profile_path
        }
      }): [];

      const movieJSON = {
        id: movieId,
        title: movieTitle,
        overview,
        poster,
        duration,
        rating,
        date_release,
        trailer: trailerKey,
        castData: castData,
        moviesRelates: relatedFiltered,
        genres,
        sources:links 
      };

      // Responde con los datos en formato JSON
      res.status(200).json(movieJSON);
    } catch (error) {
      console.error(error);
      // En caso de error, puedes manejarlo aquí y responder con un mensaje de error
      res.status(500).json({ error: "Error en servidor" });
    }
}
