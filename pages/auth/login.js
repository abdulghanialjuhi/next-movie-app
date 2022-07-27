import React from 'react'
import Home from '../../components/auth/Home'
import Meta from '../../components/layout/Meta'
import Container from '../../components/auth/layout/Container'

export default function Login() {

  return (
      <Container>
        <Meta title='Login' />
        <Home />
      </Container>
  )
}