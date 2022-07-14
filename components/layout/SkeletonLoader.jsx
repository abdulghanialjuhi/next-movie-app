import CardSkeleton from "../styled-component/CardSkeleton";
import movieStyle from '../../styles/movies.module.scss'

export default function MoviesSkeletonLoader() {

    return (  
        <div className={movieStyle['movie-containor']}>
        {[...Array(10).keys()].map((index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      )
}
