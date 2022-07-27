import axios from "axios"
import React from "react"
import useSWR from "swr"
import MoviesSkeletonLoader from "./SkeletonLoader"
import { useRouter } from "next/router"

const fetcher = (url) => axios(url).then((res) => res.data)

export default function WithSkeletonLoader({ children, url }) {

    const { data, error } = useSWR(url, fetcher)

    const router = useRouter()

    if (error) router.push('/404')

    if (!data) {
        return <> <MoviesSkeletonLoader/> </>
    }
    
    return (
        <>
            {React.cloneElement(children, {data: data.results} )}
        </>
    )
}