import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Context } from '../../context/useGlobal'
import Loader from '../../components/styled-component/Loader'

export default function Index() {

  const router = useRouter()

  const { isAuth, loading } = useContext(Context)

  if (loading) return <Loader />

 if (isAuth) router.push('/dashboard')
    else router.push('/auth/login')

  return null
}
