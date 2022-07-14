import { useEffect, useContext, useState } from 'react'
import { Context } from '../../context/useGlobal'
import axios from 'axios'
import DisplayMovies from '../movies/DisplayMovies'
import Loader from '../styled-component/Loader'
import movieStyle from '../../styles/movies.module.scss'

export default function Watchlist() {

    const [watchlistMovie, setWatchlistMovie] = useState([])
    const [loading, setLoading] = useState(true)

    const { watchlist } = useContext(Context)

    useEffect(() => {
        if (watchlist.length < 1) {
            return setLoading(false)
        }

        watchlist.forEach((movie)  => {
            axios(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            .then((res) => {
                setWatchlistMovie((prev) => [...prev, res.data])
            }).catch((err => {
                console.log(err);
            })).finally(() => setLoading(false))
        })

    }, [watchlist])

    console.log(watchlistMovie);

    if (loading || !watchlistMovie.length > 0) return <Loader/>
    return (
        <div className={movieStyle['movie-containor']}>
          <DisplayMovies data={watchlistMovie} />
        </div>
    )
}
