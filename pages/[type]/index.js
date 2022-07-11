import { useRouter } from 'next/router';
import Categories from '../../components/movies/Categories';
import DisplayMovies from '../../components/movies/DisplayMovies';
import Meta from '../../components/layout/Meta';

export default function Movies({ movies }) {

  const router = useRouter()
  const { type } = router.query

  return (
    <>
      <Meta title={type} />
      <Categories />
      <DisplayMovies movies={movies.results} />
    </>
  )
}

export async function getServerSideProps(context) {

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const { type } = context.params

  const res = await fetch(`https://api.themoviedb.org/3/movie/${type}?sort_by=popularity.desc&api_key=${process.env.DB_API_KEY}&page=1`);

  const data = await res.json();

  if (!data.total_pages > 0) {
    return {
      notFound: true,
    }
  }

  return {
      props: {
        movies: data,
        fallback: false
      }
  }
}