import React, { useRef, useState } from 'react'
import https from '../../helpers/https'
import authStyle from '../../styles/auth.module.scss'
import Input from '../styled-component/Input';
import Button from '../styled-component/Button'
import Alert from '../styled-component/Alert';
import Link from 'next/link';
import { nextApi } from '../../config'
import FormLayout from './layout/FormLayout';

export default function ForgotPassword() {

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false);

    const emailRef = useRef()

    const handleOnSubmit = (e) => {
        e.preventDefault()

        setLoading(true)
        setError(null)
        setMessage(null)

        https.post(`${nextApi}/api/reset-password`, {
            email: emailRef.current.value,
        })
        .then((res) => {
            setMessage(res.data.message)
        }).catch((err) => {
            const error = err.response?.data ? err.response.data : 'Something went wrong'
            setError(error)
        }).finally(() => setLoading(false))
    }

    return (
        <FormLayout style={{marginTop: '8.3rem'}}>
            <div className={authStyle['form-container']}>
                <h2> Forgot Password </h2>
                <div className={authStyle['message-container']}>
                    <Alert message={message} error={error} />
                </div>

                <form onSubmit={handleOnSubmit} className={authStyle['form']}>

                    <Input placeholder='Email' required valueRef={emailRef}/>

                    <Button value='Send' loading={loading} />
                    
                </form >
                <Link href='/auth/login'>
                    <a> Log in </a>
                </Link>
            </div>
        </FormLayout>
    )
}

