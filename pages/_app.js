import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import useGlobalstate, { Context } from '../context/useGlobal'
import https from '../helpers/https'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const store = useGlobalstate()
  const router = useRouter()

  useEffect(() => {
    store.actions({type: 'SET_LOADING', payload: true})

      https('http://localhost:3000/api/check')
      .then((res) => {
        store.actions({type: 'SET_AUTH', payload: true})
        store.actions({type: 'SET_NAME', payload: res.data.user_info?.name})
        store.actions({type: 'SET_EMAIL', payload: res.data.user_info?.email})
      }).catch((err) => {
        // console.clear() 
        if (pageProps.protected) {
          router.push('/auth/login')
        }
        store.actions({type: 'SET_AUTH', payload: false})
      })
      // .finally(() => store.actions({type: 'SET_LOADING', payload: false}))
  }, [router.pathname])

  return (
    <Context.Provider value={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  )
}

export default MyApp
