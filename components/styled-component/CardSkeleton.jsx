import styled from 'styled-components';
import cardStyle from '../../styles/movie-card.module.scss'

const ImgaeSkeleton = styled.div`
  height: 100%;
  width: 100%;
  background-color: gray;
`
const TextSkeleton = styled.h3`
  height: 1rem;
  width: 100px;
  background-color: gray;
  border-radius: 3px;
`

export default function CardSkeleton() {

  return (
      <div className={cardStyle["movie"]} >  

        <div className={cardStyle['img-container']}>
          <ImgaeSkeleton />
        </div>

        <div className={cardStyle["movie-info"]}>
            <div className={cardStyle['title-containor']}>
              <TextSkeleton />
            </div>
            <div className={cardStyle["voteContainor"]} />
        </div>

      </div>
  )
}
