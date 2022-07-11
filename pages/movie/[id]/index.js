import React from 'react'
import MovieInfo from '../../../components/movie/MovieInfo';
import Cast from '../../../components/movie/Cast';
import infoStyle from '../../../styles/movie-info.module.scss'
import Video from '../../../components/movie/Video';
import Similar from '../../../components/movie/Similar';
import Meta from '../../../components/layout/Meta';

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function Index({ movie, credits, videos, similar }) {

  return (
    <>
      <Meta title={movie.title} />
      <div className={infoStyle['backdrop-image']} 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
          url(${
            movie.backdrop_path
            ? IMAGE_URL + movie.backdrop_path
            : '/'
          })`,
        }}>
        <div className={infoStyle['movie-container']}>
          <MovieInfo {...movie} />
          <Cast credits={credits} />
          <Video videos={videos} />
          <Similar similar={similar} />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const { id } = context.params

  function getInfo(type) {
    return `https://api.themoviedb.org/3/movie/${id}/${type}?api_key=${process.env.DB_API_KEY}`;
  }

  const [movieRes, creditsRes, videosRes, similarRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.DB_API_KEY}`),
    fetch(getInfo('credits')),
    fetch(getInfo('videos')),
    fetch(getInfo('similar')),
  ]);
  
  const [movie, credits, videos, similar] = await Promise.all([
      movieRes.json(),
      creditsRes.json(),
      videosRes.json(),
      similarRes.json(),
    ]);

    if (!movie.title) {
      return {
        notFound: true,
      }
    } 
    
    return {
      props: {
        movie,
        credits,
        videos: videos.results,
        similar: similar.results,
      }
  }
 
}