import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Context } from '../../context/useGlobal'
import navStyle from '../../styles/nav.module.scss'
import SearchForm from '../movies/SearchForm'
import classnames from 'classnames'

export default function NavBar() {

  const [extendNav, setExtendNav] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  const classNames = classnames(navStyle['nav-container'], {[navStyle['nav-container--extend']]: extendNav });

  const handleBurgerCLick = () => {
    if (!extendNav) {
      setOpenSearch(true)
    } else {
      setOpenSearch(false)
    }
    setExtendNav(!extendNav)
  }

  return (
    <header className={navStyle.header}>
      <div className={classNames}>

        <div className={navStyle['first-nav']}>
          <div className={navStyle['upper-container']}>
            <div className={navStyle['nav-container__title-container']}>
                <Link href='/popular/1'>
                  <h2>
                    Movie <span> DB </span>
                  </h2>
                </Link> 
            </div>
            <div className={navStyle['burger-icon-container']}>
              <GiHamburgerMenu size={22} onClick={handleBurgerCLick} />
            </div>
          </div>
          <div className={navStyle.navigation}>
              <LinkRout route='/dashboard' name='Profile' /> 
              <LinkRout route='/dashboard/watchlist' name='Watchlist' />
              <LinkRout route='/auth/login' name='Log In' />
          </div>
        </div>

        <div className={navStyle['righ-container']}>
          <SearchForm openSearch={openSearch}
              setOpenSearch={setOpenSearch} />
        </div>

      </div>
    </header>
  )
}

const LinkRout = ({ route, name }) => {
  
  const router = useRouter()
  const path = router.pathname
  const { isAuth, loading } = useContext(Context)

  const activeRoute = path === `${route}` ? navStyle.active : ''
  
  if (!isAuth && name !== 'Log In') return
  
  if (isAuth && name === 'Log In') return

  return (
    <>
     {loading ? null :
      <Link href={`${route}`}>
        <a className={`${activeRoute}`}> 
          { name }
        </a>
      </Link>}
    </>
  )
}