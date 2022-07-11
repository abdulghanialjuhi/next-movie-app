import React from 'react'
import infoStyle from '../../styles/movie-info.module.scss'
import DisplayMovies from '../movies/DisplayMovies'

export default function Similar({ similar }) {
  return (
    <div className={infoStyle['similar-container']}>
        <h3 className={infoStyle['similar-text']}> Similar Movies </h3>
        <DisplayMovies movies={similar} />
    </div>
  )
}
