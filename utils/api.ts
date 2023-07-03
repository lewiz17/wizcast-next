const API_KEY = "a0a7e40dc8162ed7e37aa2fc97db5654";

export const searchMovies = async ({ search }) => {
    if (search === '') return null

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`);
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