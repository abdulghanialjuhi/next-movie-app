import CardSkeleton from '../styled-component/CardSkeleton'
import MovieCard from './MovieCard'

export default function DisplayMovies({ data }) {

  return (
    <>
      {!data ? (
        <>
         {[...Array(10).keys()].map((index) => (
            <CardSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {data.results.map((movie) => (
            <MovieCard {...movie} key={movie.id} />
          ))}
        </>
      )}
    </>
  )
}
