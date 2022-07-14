import MovieCard from './MovieCard'

export default function DisplayMovies({ data }) {

  return (
      <>
        {data.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </>
  )
}
