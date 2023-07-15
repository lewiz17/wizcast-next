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
      const imdbID: string = dataMovie.data.imdb_id;
      const rating: number = dataMovie.data.vote_average;
      const genres: object[] = dataMovie.data.genres;

      // Utiliza los datos de la primera respuesta en la siguiente solicitud a otra API
      const dataServers: AxiosResponse = await axios.get(`https://api-m1.vercel.app/api/${imdbID}`);

      const servers: object[] = dataServers.data;
      let vipID, fastID, doodID, stlare;
      if(servers.length>3){
        vipID = Buffer.from(servers[0].toString()).toString('base64');
        fastID = Buffer.from(servers[1].toString()).toString('base64');
        doodID = Buffer.from(servers[2].toString()).toString('base64');
        stlare = Buffer.from(servers[3].toString()).toString('base64');
      }else{
        vipID = Buffer.from(servers[0].toString()).toString('base64');
        fastID = Buffer.from(servers[1].toString()).toString('base64');
        doodID = Buffer.from(servers[2].toString()).toString('base64');
      }
      

      const dataVideos: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: {
          api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654'
        }
      });
      const videos: Video[] = dataVideos.data.results;
      const trailer: Video | undefined = videos && videos.length > 0 ? videos.find((video) => video.type === 'Trailer') : undefined;
      const trailerKey = trailer ? trailer.key : null;


      const dataRelates: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
        params: {
          api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
          language: 'es-MX'
        }
      });

      const related: MovieRate[] = dataRelates.data.results;
      const relatedFiltered: (string | number)[] = related && related.filter(m => m.vote_average > 6.0).map(m => m.id );

      const movieCast: AxiosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: {
          api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654',
          language: 'es-MX'
        }
      })

      const castData: object[] = movieCast.data.cast.slice(10).map(p => {
        return {
          "id": p.id,
          "name": p.name,
          "profile_url": p.profile_path
        }
      });

      const movieJSON = {
        id: movieId,
        title: movieTitle,
        overview,
        poster,
        duration,
        rating,
        trailer: trailerKey,
        castData,
        moviesRelates: relatedFiltered,
        genres,
        sources: {
            vip: `/stream/${vipID}`,
            fast: `/stream/${fastID}`,
            normal: `/stream/${doodID}`,
            slow: stlare && `/stream/${stlare}`
        }
      };

      // Responde con los datos en formato JSON
      res.status(200).json(movieJSON);
    } catch (error) {
      console.error(error);
      // En caso de error, puedes manejarlo aquí y responder con un mensaje de error
      res.status(500).json({ error: 'Ocurrió un error al obtener los detalles de la película' });
    }
}
