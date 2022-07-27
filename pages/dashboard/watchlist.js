import React from 'react'
import Meta from '../../components/layout/Meta'
import Watchlist from '../../components/watchlist/Watchlist'

export default function WatchlistPage() {
  return (
    <>
      <Meta title='Watchlist' />
      <Watchlist />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    }
  }
}