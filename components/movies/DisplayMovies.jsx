import MovieCard from './MovieCard'
import movieStyle from '../../styles/movies.module.scss'

export default function DisplayMovies({ data }) {

  return (
    <div className={movieStyle['movie-containor']}>
      {data.length > 0 ? (
        <>
          {data.map((movie) => (
            <MovieCard {...movie} key={movie.id} />
          ))}
        </>
      ) : (
        <h2> No movies found </h2>
      )}
    </div>
  )
}
