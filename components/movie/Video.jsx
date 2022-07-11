import React from 'react'
import infoStyle from '../../styles/movie-info.module.scss'

export default function Video({ videos }) {

    return (
        <div className={infoStyle["iframeContainer"]}>
        <div className={infoStyle['trailer_container']}>
            <h3>Trailer</h3>
            <iframe
            src={`https://www.youtube.com/embed/${videos[0]?.key}`}
            title="myFrame"
            allowFullScreen
            />
        </div>
        </div>
    );
}
