import React, { useRef, useState } from 'react'
import https from '../../helpers/https'
import authStyle from '../../styles/auth.module.scss'
import Input from '../styled-component/Input';
import Button from '../styled-component/Button'
import Alert from '../styled-component/Alert';
import { nextApi } from '../../config';

export default function SignUp({ setIsSignUp }) {

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false);

    const usernameRef = useRef()
    const emailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setError(null)
        setMessage(null)

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('password does not match') 
        }

        setLoading(true)

        https.post(`${nextApi}/api/signup`, {
            userName:  usernameRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
        .then((res) => {
            setMessage(res.data.message)
            setTimeout(() => setIsSignUp(false), 1500)
        }).catch((err) => {
            const error = err.response?.data ? err.response.data : 'Something went wrong'
            setError(error);
        }).finally(() => setLoading(false))
    }

    return (
        <div className={authStyle['form-container']}>
            <h2> Sign Up </h2>
            <div className={authStyle['message-container']}>
                <Alert message={message} error={error} />
            </div>

            <form onSubmit={handleOnSubmit} className={authStyle['form']}>
                <Input placeholder='Username' 
                required valueRef={usernameRef}/>

                <Input placeholder='Name' required valueRef={nameRef}/>
                <Input placeholder='Email' required valueRef={emailRef}/>

                <div className={authStyle['password-input']}>
                    <Input placeholder='Password' type='password' minLength={8} required valueRef={passwordRef}  />
                    <Input placeholder='Confirm Password' type='password' minLength={8} required valueRef={confirmPasswordRef}  />
                </div>

                <Button value='Sing up' loading={loading} />
            </form >
        </div>
    )
}
