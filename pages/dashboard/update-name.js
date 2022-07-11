import React from 'react'
import Meta from '../../components/layout/Meta'
import Continer from '../../components/auth/layout/Container'
import UpdateName from '../../components/auth/UpdateName'
import WithAuth from '../../components/auth/layout/WithAuth'

export default function Update() {
  return (
    <WithAuth>
      <Continer>
        <Meta title='Update Name' />
        <UpdateName />
      </Continer>
    </WithAuth>
  )
}

export async function getStaticProps() {
    return {
        props: {
        protected: true,
        },
    }
}
    