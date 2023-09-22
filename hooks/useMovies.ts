import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../utils/api'


export function useMovies ({ search, page, sort }: {
    search: string | string[],
    page: number,
    sort: boolean
}) {
  const [movies, setMovies] = useState([])
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const moviesTotal = [];
  // el error no se usa pero puedes implementarlo
  // si quieres:
  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search, page }) => {
    if (search === previousSearch.current) return
    // search es ''

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search, page })
      setMovies(prevMovies => [
        ...prevMovies,
        ...newMovies.movies.map(movie => ({ ...movie, key: movie.id }))
      ]);
      setTotal(newMovies.total);
    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, total, getMovies, loading }
}