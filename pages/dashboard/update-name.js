import React from 'react'
import Meta from '../../components/layout/Meta'
import Continer from '../../components/auth/layout/Container'
import Update from '../../components/auth/UpdateName'
import WithAuth from '../../components/auth/layout/WithAuth'

export default function UpdateName() {

  return (
      <Continer>
        <Meta title='Update Name' />
        <Update />
      </Continer>
  )
}


UpdateName.getLayout = function getLayout(page) {

  return (
    <WithAuth>
      {page}
    </WithAuth>
  )
}

export async function getStaticProps() {
  return {
    props: {
    protected: true,
    }
  }
}
    