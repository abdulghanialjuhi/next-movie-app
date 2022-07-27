import infoStyle from '../../styles/movie-info.module.scss'
import DisplayMovies from '../movies/DisplayMovies'

export default function Similar({ data }) {
  return (
    <div className={infoStyle['similar-container']}>
      <h3 className={infoStyle['similar-text']}> Similar Movies </h3>
      <DisplayMovies data={data} />
    </div>
  )
}
