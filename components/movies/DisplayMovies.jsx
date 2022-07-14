import MovieCard from './MovieCard'

export default function DisplayMovies({ data }) {

  return (
      <>
        {data.results.map((movie) => (
          <MovieCard {...movie} key={movie.id} />
        ))}
      </>
  )
}
