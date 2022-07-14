import { useRouter } from 'next/router';
import DisplayMovies from '../../../components/movies/DisplayMovies';
import Meta from '../../../components/layout/Meta';
import movieStyle from '../../../styles/movies.module.scss'

export default function Movies({ movies }) {

  const router = useRouter()
  const { param } = router.query

  return (
    <>
      <Meta title={param} />
      {movies.length > 0 ? (
        <div className={movieStyle['movie-containor']}>
          <DisplayMovies data={movies} /> 
        </div>
      )
      : <h2> Movie not found </h2>
      }
    </>
  )
}

export async function getServerSideProps(context) {

  const search_api =
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.DB_API_KEY}&query=`;

  const { param } = context.params

  const res = await fetch(search_api + param);

  const data = await res.json();

  return {
      props: {
        movies: data.results,
      }
  }
}