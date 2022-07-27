import CardSkeleton from "../../styled-component/CardSkeleton";
import movieStyle from '../../../styles/movies.module.scss'
import { useState, useEffect } from "react";

export default function MoviesSkeletonLoader() {

  const [show, setShow] = useState(true)

  useEffect(() =>  {
    let timeOut = setTimeout(() => setShow(false), 200)

    return () => clearTimeout(timeOut)
  }, [])

  return (  
    <div className={movieStyle['movie-containor']}>
      {!show &&
      <>
      {[...Array(10).keys()].map((index) => (
        <CardSkeleton key={index} />
        ))}
      </>
      }
    </div>
  )
}
