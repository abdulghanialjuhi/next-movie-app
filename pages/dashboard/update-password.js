import React from 'react'
import Meta from '../../components/layout/Meta'
import Continer from '../../components/auth/layout/Container'
import UpdatePass from '../../components/auth/UpdatePass'
import WithAuth from '../../components/auth/layout/WithAuth'

export default function UpdatePassword() {
  return (
    <WithAuth>
      <Continer>
        <Meta title='Update Password' />
        <UpdatePass />
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
    