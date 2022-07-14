import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router';
import React from 'react'

// const fetcher = (url) => axios(url).then((res) => res.data)

export default function WithSkeletonLoader({ children, skeletonLoader, componentsFunction }) {

    // const router = useRouter()
    // const { type, id } = router.query
  
    // const url = `https://api.themoviedb.org/3/movie/${type}?sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${id}`
    
    // const { data, error } = useSWR(url, fetcher)

    // if (error) return <h2> faild to load </h2>

    // if (!data && skeletonLoader) {
    //     return <>{skeletonLoader}</>
    // }

    const data = componentsFunction()


    if (!data && skeletonLoader) {
        return <>{skeletonLoader}</>
    }
    
    console.log('data: ', data);
    return (
        <>
            {React.cloneElement(children, data )}
        </>
    )
}