import { useEffect, useState } from 'react'
import MovieInfo from '../../../components/movie/MovieInfo';
import Cast from '../../../components/movie/Cast';
import infoStyle from '../../../styles/movie-info.module.scss'
import Video from '../../../components/movie/Video';
import Similar from '../../../components/movie/Similar';
import Meta from '../../../components/layout/Meta';
import { useRouter } from 'next/router';
import axios from 'axios';
import WithSkeletonLoader from '../../../components/movies/layout/Withskeleton';
import Loader from '../../../components/styled-component/Loader'

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function Mvoie() {

  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState(null)
  const [video, setVideo] = useState(null)

  const [error, setError] = useState(null)

  const router = useRouter()
  const { id } = router.query

  function getInfo(type) {
    return `https://api.themoviedb.org/3/movie/${id}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    
  }

  useEffect(() => {
    setLoading(true)
    if(!router.isReady) return;

    const movieRes = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
    const creditsRes = axios.get(getInfo('credits'))
    const videosRes = axios.get(getInfo('videos'))

    axios.all([movieRes, creditsRes, videosRes]).then(axios.spread((...responses) => {
      setMovie(responses[0].data)
      setCast(responses[1].data)
      setVideo(responses[2].data)
    })).catch(error => {
        setError(error)
    })
    .finally(() => setLoading(false))

  }, [id])

  if (error) router.push('/404')

  if (!movie || loading) return <Loader />

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
          <WithSkeletonLoader url={getInfo('similar')}>
            <Similar />
          </WithSkeletonLoader>
        </div>
      </div>
    </>
  )
}