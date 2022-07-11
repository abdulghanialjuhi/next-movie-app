import Link from 'next/link'
import React from 'react'
import moviesStyle from '../../styles/movies.module.scss'
import { useRouter } from 'next/router'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Pagination({ movie }) {

    const router = useRouter();
    const { id, type } = router.query

    const totalPages = movie.total_pages < 500 ? movie.total_pages : 500

    const remaining = totalPages - +id + 1
    const nums = 4

    const numbers = +id + nums <= totalPages ? +id + nums : +id + remaining

    const pageNumbers = []

    const begin = id <= 3 ? id : id - 2  

    let x = 0;

    for(let i = begin; i < numbers; i++){
        x < 5 && pageNumbers.push(i)
        x++
    }

    const handleArrowLeft = () => {
        if (id > 1) {
            router.push(`/${type}/${id - 1}`)
        }
    }

    const handleArrowRight = () => {
        if (id < totalPages) {
            router.push(`/${type}/${+id + 1}`)
        }
    }

    return (
        <div className={moviesStyle['pagination-container']}>
            <ul>
                <li onClick={handleArrowLeft}>
                    <FaArrowLeft />
                </li>
                {pageNumbers.map(number => (
                    <LinkRout key={number} route={number} name={number} />
                ))}
                <li onClick={handleArrowRight}>
                    <FaArrowRight />
                </li>
            </ul>
        </div>
    )
}

const LinkRout = ({ route, name }) => {
  
    const router = useRouter()
    const { type, id } = router.query
  
    const activeRoute = (route) => {
      return id === `${route}` ? moviesStyle.active : ''
    } 
  
    return (
        <Link href={`/${type}/${route}`}>
            <li className={`${activeRoute(route)}`}>
                { name }
            </li>
        </Link>
    )
}