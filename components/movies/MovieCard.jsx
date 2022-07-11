import Link from 'next/link'
import React from 'react'
import cardStyle from '../../styles/movie-card.module.scss'
import Image from '../Image';

const getClassByRate = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
}

export default function MovieCard({ poster_path, title, vote_average, id }) {

    const vote = vote_average.toString()

    return (
        <div className={cardStyle["movie"]} >  

            <Link href={`/movie/${id}`}>
                <div className={cardStyle['img-container']}>
                    <Image isImg={poster_path} alt={title} />
                </div>
            </Link>

            <div className={cardStyle["movie-info"]}>
                <div className={cardStyle['title-containor']}>
                    <h3>{title}</h3>
                </div>
                <div className={cardStyle["voteContainor"]}>
                    <span className={cardStyle[getClassByRate(vote_average)]}>
                        {vote.slice(0,3)}
                    </span>
                </div>
            </div>

        </div>
    )
}
