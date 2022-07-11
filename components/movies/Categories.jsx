import Link from 'next/link'
import React from 'react'
import moviesStyle from '../../styles/movies.module.scss'
import { useRouter } from 'next/router'


export default function Categories() {

  return (
    <div className={moviesStyle['categories-container']}>
        <LinkRout route='popular' name='Popular'/>
        <LinkRout route='upcoming' name='Up Coming' />
        <LinkRout route='top_rated' name='Top Rated' />
    </div>
  )
}

const LinkRout = ({ route, name }) => {
  
  const router = useRouter()
  const { type } = router.query

  const activeRoute = (route) => {
    return type === `${route}` ? moviesStyle.active : ''
  } 

  return (
    <Link href={`/${route}/1`}>
      <a className={`${activeRoute(route)}`}> 
        { name }
      </a>
    </Link>
  )
}