import Dashboard from '../../components/auth/Dashboard'
import Meta from '../../components/layout/Meta'
import Container from '../../components/auth/layout/Container'
import WithAuth from '../../components/auth/layout/WithAuth'

export default function Profile() {

  return (
      <Container>
        <Meta title='My' />
        <Dashboard />
      </Container>
  )
}

Profile.getLayout = function getLayout(page) {

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
    