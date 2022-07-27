import { useEffect, useContext, useState } from 'react'
import { Context } from '../../context/useGlobal'
import axios from 'axios'
import DisplayMovies from '../movies/DisplayMovies'
import movieStyle from '../../styles/movies.module.scss'
import MoviesSkeletonLoader from '../movies/layout/SkeletonLoader'

export default function Watchlist() {

    const fetchData = async (movies) => {
        const allAsyncResults = [];
    
        for (const movie of movies) {
            const res = await axios(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            allAsyncResults.push(res.data);
        }
    
        return allAsyncResults;
    };

    const [watchlistMovie, setWatchlistMovie] = useState([])
    const [watchlistLoading, setWatchlistLoading] = useState(true)

    const { watchlist, loading } = useContext(Context)

    useEffect(() => {
        if (watchlistMovie.length > 0) {
            setWatchlistLoading(false)
        }
    }, [watchlistMovie])


    useEffect(() => {
        if (!loading && watchlist.length < 1) return setWatchlistLoading(false)

        const fetch = async () => {
            const func = await fetchData(watchlist)
            setWatchlistMovie(func)
        }
        fetch()

    }, [watchlist])

  

    if (loading || watchlistLoading) return <MoviesSkeletonLoader/>

    return (
        <div className={movieStyle['movie-containor']}>
          <DisplayMovies data={watchlistMovie} />
        </div>
    )
}
