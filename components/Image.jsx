import React from 'react'
import Image from 'next/image'

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function Images({ isImg, alt }) {

  return (
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
      <Image 
      layout='fill'
      src={isImg ? `${IMAGE_URL}${isImg}` : "/not-found.jpeg"}
      alt={alt} />
    </div>
  )
}
