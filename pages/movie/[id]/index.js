import React, { useEffect, useState } from 'react'
import MovieInfo from '../../../components/movie/MovieInfo';
import Cast from '../../../components/movie/Cast';
import infoStyle from '../../../styles/movie-info.module.scss'
import Video from '../../../components/movie/Video';
import Similar from '../../../components/movie/Similar';
import Meta from '../../../components/layout/Meta';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import MoviesSkeletonLoader from '../../../components/layout/SkeletonLoader';

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";


export default function Mvoie() {

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState(null)
  const [video, setVideo] = useState(null)
  const [similar, setSimilar] = useState(null)

  const [error, setError] = useState(null)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if(!router.isReady) return;
    

    function getInfo(type) {
      return `https://api.themoviedb.org/3/movie/${id}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    }

    const movieRes = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
    const creditsRes = axios.get(getInfo('credits'))
    const videosRes = axios.get(getInfo('videos'))
    const similarRes = axios.get(getInfo('similar'))

    axios.all([movieRes, creditsRes, videosRes, similarRes]).then(axios.spread((...responses) => {
      setMovie(responses[0].data)
      setCast(responses[1].data)
      setVideo(responses[2].data)
      setSimilar(responses[3].data)
    })).catch(error => {
        setError(error)
    })

  }, [router.isReady, id])

  if (error) return <h1> error </h1>
  if (!movie) return <h1> loading </h1>

  if (!movie.title) return <h1> error </h1>

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
          <Cast credits={cast} />
          <Video videos={video.results} />
          <Similar similar={similar} />
        </div>
      </div>
    </>
  )
}

// Mvoie.getLayout = function getLayout(page) {

//   function fetcher(...urls) {
//     const f = (u) => fetch(u).then((r) => r.json());
  
//     if (urls.length > 1) {
//       return Promise.all(urls.map(f));
//     }
//     return f(urls);
//   }

//   const router = useRouter()
//   const { id } = router.query

//   function getInfo(type) {
//     return `https://api.themoviedb.org/3/movie/${id}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
//   }

//   const movieRes = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
//   const creditsRes = getInfo('credits')
//   const videosRes = getInfo('videos')
//   const similarRes = getInfo('similar')

//   const { data, error } = useSWR([movieRes, creditsRes, videosRes, similarRes], fetcher)

//   if (error) return <h1> error </h1>
//   if (!data) return <h1> loading </h1>

//   if (!data[0].title) return <h1> error </h1>

//   return (
//     <>{React.cloneElement(page, data)}</>
//   )

// }

// Mvoie.componentsFunction = async () => {

  
//   const router = useRouter()
//   const { id } = router.query
  
//   function getInfo(type) {
//     return `https://api.themoviedb.org/3/movie/${id}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
//   }

//   const [movieRes, creditsRes, videosRes, similarRes] = await Promise.all([
//     fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`),
//     fetch(getInfo('credits')),
//     fetch(getInfo('videos')),
//     fetch(getInfo('similar')),
//   ]);

  
//   const [movie, credits, videos, similar] = await Promise.all([
//       movieRes.json(),
//       creditsRes.json(),
//       videosRes.json(),
//       similarRes.json(),
//     ]);

//   const data = [ movie, credits, videos, similar ]

//   console.log('data1: ',data);
//   if (!movie.title) return <h2> faild to load </h2>

//   return data
// }


// export async function getServerSideProps(context) {

//   // context.res.setHeader(
//   //   'Cache-Control',
//   //   'public, s-maxage=10, stale-while-revalidate=59'
//   // )

//   const { id } = context.params

//   function getInfo(type) {
//     return `https://api.themoviedb.org/3/movie/${id}/${type}?api_key=${process.env.DB_API_KEY}`;
//   }

//   const [movieRes, creditsRes, videosRes, similarRes] = await Promise.all([
//     fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.DB_API_KEY}`),
//     fetch(getInfo('credits')),
//     fetch(getInfo('videos')),
//     fetch(getInfo('similar')),
//   ]);
  
//   const [movie, credits, videos, similar] = await Promise.all([
//       movieRes.json(),
//       creditsRes.json(),
//       videosRes.json(),
//       similarRes.json(),
//     ]);

//     if (!movie.title) {
//       return {
//         notFound: true,
//       }
//     } 
    
//     return {
//       props: {
//         movie,
//         credits,
//         videos: videos.results,
//         similar: similar.results,
//       }
//   }
 
// }