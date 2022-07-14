import { useRouter } from 'next/router';
import Categories from '../../components/movies/Categories';
import DisplayMovies from '../../components/movies/DisplayMovies';
import Meta from '../../components/layout/Meta';
import movieStyle from '../../styles/movies.module.scss'

export default function Movies({ movies }) {

  const router = useRouter()
  const { type } = router.query

  return (
    <>
      <Meta title={type} />
      <Categories />
      <div className={movieStyle['movie-containor']}>
        <DisplayMovies data={movies} />
      </div>
    </>
  )
}

export async function getStaticProps(context) {

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
      movies: data.results,
      fallback: false
    }
  }
}

export async function getStaticPaths() {

  const ids = ['popular', 'upcoming', 'top_rated']
  const paths = ids.map(id => ({params: {type: id}}))

  return {
    paths,
    fallback: false
  }
}