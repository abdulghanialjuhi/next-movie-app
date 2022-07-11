import React from 'react'
import infoStyle from '../../styles/movie-info.module.scss'
import Image from '../Image';
import WatchlistBtn from './WatchlistBtn';

export default function MovieInfo(
    { overview, poster_path, title,
    vote_average, spoken_languages,
    release_date, genres, id }) {

    const genresNames = genres.slice(0, 3);

    return (
        <div className={infoStyle['overview_information']}>
            <div className={infoStyle['poster-container']}>
                <Image isImg={poster_path} alt={title} />
            </div>

            <div  className={infoStyle["overview-containor"]}>
                <h2 className={infoStyle['title']}>{title}</h2>
                <ul className={infoStyle['ul-information']}>
                    <li>
                        <h3 
                        style={{ color: "#f3ce13" }}>
                            IMDB Rating:
                        </h3>
                        <span>
                        {vote_average}
                        </span>
                    </li>
                    <li>
                        <h3> Language: </h3>
                        <span>
                        {spoken_languages[0]
                        ? spoken_languages[0].english_name
                        : "undefind"}
                        </span>
                    </li>
                    <li>
                        <h3> Year: </h3>
                    <span> {release_date.slice(0, -6)}</span>
                    </li>
                </ul>

                <div className={infoStyle['genres']}>
                    <h3>Genres:</h3>
                    <ul>
                        {genresNames.map((genreName) => (
                        <li key={genreName.id}>
                            {genreName.name}
                        </li>
                        ))}
                    </ul>
                </div>

                <WatchlistBtn id={id} />
                <p className={infoStyle['overview-story']}> {overview} </p>
            </div>
        </div>
    )
}
