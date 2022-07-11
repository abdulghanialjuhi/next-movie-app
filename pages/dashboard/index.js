import React from 'react'
import Dashboard from '../../components/auth/Dashboard'
import Meta from '../../components/layout/Meta'
import Container from '../../components/auth/layout/Container'
import WithAuth from '../../components/auth/layout/WithAuth'

export default function Profile() {
  return (
    <WithAuth>
      <Container>
        <Meta title='My' />
        <Dashboard />
      </Container>
    </WithAuth>
  )
}

Profile.skeletonLoader = 's'

export async function getStaticProps() {
    return {
        props: {
        protected: true,
        },
    }
}
    