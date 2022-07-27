import React from 'react'
import Meta from '../../components/layout/Meta'
import Continer from '../../components/auth/layout/Container'
import UpdatePass from '../../components/auth/UpdatePass'
import WithAuth from '../../components/auth/layout/WithAuth'

export default function UpdatePassword() {

  return (
      <Continer>
        <Meta title='Update Password' />
        <UpdatePass />
      </Continer>

  )
}

UpdatePassword.getLayout = function getLayout(page) {

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
    