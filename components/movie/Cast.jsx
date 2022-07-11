import React, { useState } from 'react'
import infoStyle from '../../styles/movie-info.module.scss'
import Image from '../Image';


export default function Cast({ credits }) {

  const [all, setAll] = useState("none");

  const handleAll = () => {
    if (all === "none") {
      setAll("block");
    } else {
      location.href = "#actors";
      setAll("none");
    }
  };

  return (
    <div id='actors' className={infoStyle['actors']}>
        <div className={infoStyle['actors-label']}>
            <h1> Cast </h1>
        </div>
        <div className={infoStyle['actors-container']}>
            {credits.cast.map((actor) => (
                <div
                  key={actor.cast_id}
                  className={infoStyle["actor-container"]}
                  style={{ display: actor.order < 6 ? "block" : all }}
                >
                  <div className={infoStyle["actor-img"]}>
                      <Image isImg={actor.profile_path} alt={actor.name} />
                  </div>
                  <div className={infoStyle['actor-name']}>
                    <h5> {actor.name} </h5>
                    <span> {actor.character} </span>
                  </div>
                </div>
              ))}
        </div>
        <div onClick={handleAll} className={infoStyle["more-actors"]}>
            <h4> {all === "none" ? "See All" : "See Less"} </h4>
        </div>
    </div>
  )
}
