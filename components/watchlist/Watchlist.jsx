import { useEffect, useContext, useState } from 'react'
import { Context } from '../../context/useGlobal'
import axios from 'axios'
import DisplayMovies from '../movies/DisplayMovies'
import Loader from '../styled-component/Loader'

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

    return (
        <>
          {loading ? <Loader /> : <DisplayMovies movies={watchlistMovie} />}
        </>
    )
}
