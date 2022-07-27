import DisplayMovies from '../../../components/movies/DisplayMovies';
import Pagination from '../../../components/movies/Pagination';
import Meta from '../../../components/layout/Meta';
import Categories from '../../../components/movies/Categories';
import { useRouter } from 'next/router';
import React from 'react';
import WithSkeletonLoader from '../../../components/movies/layout/Withskeleton';

export default function Index(data) {

  const router = useRouter()
  const { type, id } = router.query

  const url = `https://api.themoviedb.org/3/movie/${type}?sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${id}`

  return (  
    <>
      <Meta title={type} />
      <Categories />
      <WithSkeletonLoader url={url}>
        <DisplayMovies />
      </WithSkeletonLoader>
      <Pagination movie={data} />
    </>
  )
}