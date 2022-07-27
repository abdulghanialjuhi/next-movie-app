import { useRouter } from 'next/router';
import DisplayMovies from '../../../components/movies/DisplayMovies';
import Meta from '../../../components/layout/Meta';
import WithSkeletonLoader from '../../../components/movies/layout/Withskeleton';
import React from 'react';

export default function Search({ data }) {

  const router = useRouter()
  const { param } = router.query

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${param}`

  return (
    <>
      <Meta title={param} />
      <WithSkeletonLoader url={url}>
        <DisplayMovies data={data} /> 
      </WithSkeletonLoader>
    </>
  )
}
