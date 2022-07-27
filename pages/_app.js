import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import useGlobalstate, { Context } from '../context/useGlobal'
import https from '../helpers/https'
import { nextApi } from '../config'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const store = useGlobalstate()
  const router = useRouter()

  const getLayout = Component.getLayout || ((page) => page)

  useEffect(() => {

      https(`${nextApi}/api/check`)
      .then((res) => {
        if (res.data.auth) {
          store.actions({type: 'SET_AUTH', payload: true})
          store.actions({type: 'SET_NAME', payload: res.data.user_info?.name})
          store.actions({type: 'SET_EMAIL', payload: res.data.user_info?.email})
        } else {
          if (pageProps.protected) {
            router.push('/auth/login')
          }
          store.actions({type: 'SET_AUTH', payload: false})
        }
      }).finally(() => store.actions({type: 'SET_LOADING', payload: false}))
  }, [router.pathname])

  return (
    <Context.Provider value={store}>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </Context.Provider>
  )
}

export default MyApp
