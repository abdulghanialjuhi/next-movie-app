import Categories from '../components/movies/Categories';
import DisplayMovies from '../components/movies/DisplayMovies';
import Meta from '../components/layout/Meta';
import movieStyle from '../styles/movies.module.scss'

export default function Home({ movies }) {
  return (  
    <>
      <Meta title='Home' />
      <Categories />
      <div className={movieStyle['movie-containor']}>
        <DisplayMovies data={movies} />
      </div>
    </>
  )
}

export async function getStaticProps() {

  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?sort_by=popularity.desc&api_key=${process.env.DB_API_KEY}&page=1`);

  const data = await res.json();

  if (!data.total_pages > 0) {
    return {
      notFound: true,
    }
  }

  return {
      props: {
        movies: data.results,
        revalidate: 60,
      }
  }
}
