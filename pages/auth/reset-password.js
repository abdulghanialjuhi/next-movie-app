import React from 'react'
import ResetPassword from '../../components/auth/ResetPassword'
import Container from '../../components/auth/layout/Container'
import Meta from '../../components/layout/Meta'

export default function Reset() {
  return (
    <Container>
      <Meta title='Reset Password' />
      <ResetPassword />
    </Container>
  )
}
