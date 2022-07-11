import React from 'react'
import authStyle from '../../styles/auth.module.scss'

export default function Nav({ isSignUp, setIsSignUp }) {

  const setLogIn = () => {
    setIsSignUp(false)
  }

  const setSignUp = () => {
    setIsSignUp(true)
  }
  
  return (
    <ul className={authStyle['nav-container']}>
      <li 
      className={`${authStyle['login-box']} ${!isSignUp ? authStyle['active'] : ''}`}
      onClick={setLogIn}>
          Log in
      </li>
      <li className={`${isSignUp ? authStyle['active'] : ''}`}
            onClick={setSignUp}>
          Sign up
      </li>
    </ul>
  )
}
