const API_KEY = "a0a7e40dc8162ed7e37aa2fc97db5654";

type MovieTrailer = {
  id: string;
  key: string;
  name: string;
  type: string;
};

export const searchMovies = async ({ search }) => {
    if (search === '') return null

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}&language=es-MX`);
        const result = await response.json();

        const movies = result.results;

        const newMovies = movies?.map(movie => ({
            id: movie.id,
            title: movie.original_title,
            rate: movie.vote_average,
            date: movie.release_date,
            poster: movie.poster_path
        }))

        return newMovies.filter((v) => v.rate >= 5)

    } catch (e) {
        throw new Error('Error searching movies')
    }
}

export const getMovieTrailerUrl = async (movieId: string): Promise<string | null> => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();

    const videos: MovieTrailer[] = result.results;

    const trailer = videos.length> 0 ? videos.find((video) => video.type === 'Trailer') : "";

    if (trailer !== '') {
      return `https://www.youtube.com/embed/${trailer.key}?color=white&showinfo=0&rel=0`;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    return null;
  }
};
