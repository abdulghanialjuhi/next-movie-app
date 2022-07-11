import movieStyle from '../../styles/movies.module.scss'
import MovieCard from './MovieCard'

export default function DisplayMovies({ movies }) {

  if (!movies || movies.length < 1 ) {
    return (
      <div className={movieStyle['movie-containor']}>
        <h2> No movies found </h2> 
      </div>
    )
  }

  return (
    <div className={movieStyle['movie-containor']}>
        {movies.map((movie) => (
            <MovieCard {...movie} key={movie.id} />
        ))}
    </div>
  )
}
