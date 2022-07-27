import Meta from './Meta'
import NavBar from './NavBar'
import styles from '../../styles/Home.module.scss'
import Footer from './Footer'

export default function Layout({ children }) {

  return (
    <>
      <Meta />
      <div className={styles.container}>
          <NavBar />
          <main className={styles.main}>
              {children}
          </main>
          <Footer />
      </div>
    </>
  )
}
