import Categories from '../../../components/movies/Categories';
import DisplayMovies from '../../../components/movies/DisplayMovies';
import Meta from '../../../components/layout/Meta';
import Pagination from '../../../components/movies/Pagination';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import movieStyle from '../../../styles/movies.module.scss'

const fetcher = (url) => axios(url).then((res) => res.data)

export default function Index() {

  const router = useRouter()
  const { type, id } = router.query

  const url = `https://api.themoviedb.org/3/movie/${type}?sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${id}`

  const { data, error } = useSWR(url, fetcher)

  if (error) return <h2> faild to load </h2>

  return (  
    <>
      <Meta title={type} />
      <Categories />
      <div className={movieStyle['movie-containor']}>
         <DisplayMovies data={data} />
      </div>
      {data && <Pagination movie={data} />}
    </>
  )
}

// export async function getServerSideProps(context) {
  
//   context.res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59'
//   )
//     const { type, id } = context.params

//     const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?sort_by=popularity.desc&api_key=${process.env.DB_API_KEY}&page=${id}`);
  
//     const data = await response.json();

//     if (!data.total_pages > 0) {
//       return {
//         notFound: true,
//       }
//     }
    
//     return {
//       props: {
//         movies: data,
//       }
//     }
// }
