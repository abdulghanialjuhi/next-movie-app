import { useState, createContext, useEffect } from "react";
import { nextApi } from "../config";
import https from "../helpers/https";

export const Context = createContext({});

const useGlobalstate = () => {

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [isAuth, setIsAuth] = useState(false)

  const actions = (action) => {
    const { type, payload } = action;

    switch (type) {
      case "SET_WATCHLIST":
        return setWatchlist(payload)
      case 'SET_AUTH':
        return setIsAuth(payload)
      case 'SET_LOADING':
        return setLoading(payload)
      case 'SET_NAME':
        return setName(payload)
      case 'SET_EMAIL':
        return setEmail(payload)
      default:
        return watchlist;
    }
  };

  useEffect(() => {
    isAuth && https(`${nextApi}/api/get-movies`)
    .then((res) => {
      // console.log(res);
      setWatchlist(res.data.movies)
    }).catch((err) => {
      console.log(err);
    })
  }, [isAuth])

  return { actions, name, email, isAuth, watchlist, loading };
};

export default useGlobalstate;