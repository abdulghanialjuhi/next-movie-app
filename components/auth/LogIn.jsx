import React, { useRef, useState, useEffect, useContext } from 'react'
import https from '../../helpers/https'
import authStyle from '../../styles/auth.module.scss'
import Input from '../styled-component/Input';
import Button from '../styled-component/Button'
import Alert from '../styled-component/Alert';
import Link from 'next/link';
import { Context } from '../../context/useGlobal';
import { useRouter } from 'next/router';
import LogOut from './LogOut';
import { nextApi } from '../../config';


export default function Login() {

    const [error, setError] = useState(null)
    const { actions, isAuth } = useContext(Context)

    const userRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    useEffect(() => {
        if (isAuth) return
        userRef.current.value = 'gfyjd@outlook.com'
        passwordRef.current.value = 'aaaaaaaa'
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        https.post(`${nextApi}/api/login`, {
            user: userRef.current.value,
            password: passwordRef.current.value,
        })
        .then((res) => {
            router.push('/dashboard')
        }).catch((err) => {
            console.log(err);
            const error = err.response?.message ? err.response?.message : err?.response?.data ? err.response.data : 'Something went wrong'
            console.log(err);
            setError(error);
        }).finally(() => setLoading(false))
    }

    const LoggedIn = () => {
    
        return (
            <>
                <h2> You already logged in </h2>
                <div className={authStyle['message-container']}>
                {error && <Alert error={error} />}
                </div>
                <LogOut setError={setError} setLoading={setLoading} loading={loading} />
            </>
        )
    }

    return (
        <div className={authStyle['form-container']}>
             {!isAuth ?
           <>
            <h2> Log In </h2>
         
            <div className={authStyle['message-container']}>
                {error && <Alert error={error} />}
            </div>
           
            <form onSubmit={handleOnSubmit} className={authStyle['form']}>

                <Input placeholder='Email or Username' required valueRef={userRef}/>
                <Input placeholder='Password' type='password' minLength={8} required valueRef={passwordRef} />

                <Button value='Login' loading={loading} />
                
            </form >
            <Link href='/auth/reset-password'>
                <a> Forgot Password </a>
            </Link>
           </> :
           <LoggedIn loading={loading} actions={actions} />
            }
        </div>
    )
}

