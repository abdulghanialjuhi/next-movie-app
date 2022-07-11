import { useContext, useState } from 'react'
import { nextApi } from '../../config'
import { Context } from '../../context/useGlobal'
import https from '../../helpers/https'
import infoStyle from '../../styles/movie-info.module.scss'
import Loader from '../styled-component/Loader'

export default function WatchlistBtn({ id }) {

    const [loading, setLoading] = useState(false)

    const { actions, watchlist, isAuth } = useContext(Context)

    let storedMovie = watchlist && watchlist.find((o) => o === id.toString());
    const watchlistDisabled = storedMovie ? true : false;
  
    const handleClick = () => {
        if (!watchlistDisabled) {
            addMovie()
        } else {
            removeMovie()
        }
    }

    const addMovie = () => {
        setLoading(true)

        https.post(`${nextApi}/api/add-movie`, {
            movie_id: id
        })
        .then((res) => {
            // console.log(res);
            actions({type: 'SET_WATCHLIST', payload: [...watchlist, id.toString()]})
        }).catch((err) => {
            console.log(err);
        }).finally(() => setLoading(false))
    }

    const removeMovie = () => {
        setLoading(true)

        https.delete(`${nextApi}/api/remove-movie`, {
            data: {
                movie_id: id
            }
        })
        .then((res) => {
            // console.log(res);
            const remove = watchlist.filter((w) => w !== id.toString());
            actions({type: 'SET_WATCHLIST', payload: remove })
        }).catch((err) => {
            console.log(err);
        }).finally(() => setLoading(false))
    }

    const getClassName = () => {
        return {
            class: isAuth && watchlistDisabled ? infoStyle['watchlisted'] : '',
            name:  isAuth && watchlistDisabled ? 'Remove from watchlist' : 'Add to watchlist'
        }
    }

    return (
        <div
         className={`${infoStyle['watchlist-btn']} ${getClassName().class}`}>
            {!loading ? ( 
                <button disabled={!isAuth} onClick={handleClick}> 
                    {getClassName().name}
                {!isAuth && <span className={infoStyle['tooltip']}> Please log in to add movies to watchlist </span>}
                </button> 
            ) : <Loader/>
            }
        </div>
    )
}