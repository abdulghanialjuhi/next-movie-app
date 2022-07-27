import FormLayout from './layout/FormLayout'
import authStyle from '../../styles/auth.module.scss'
import { useState, useRef, useEffect } from 'react'
import { nextApi } from '../../config'
import Input from '../styled-component/Input'
import Button from '../styled-component/Button'
import https from '../../helpers/https'
import Alert from '../styled-component/Alert'
import { useRouter } from 'next/router'

export default function UpdatePassword() {

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false);

    const oldPassRef = useRef()
    const newPassRef = useRef()
    const confirmnewPassRef = useRef()

    const router = useRouter()

    useEffect(() => {
        oldPassRef.current.value = 'aaaaaaaa'
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setError(null)
        setMessage(null)

        if (newPassRef.current.value !== confirmnewPassRef.current.value) {
            return setError('Password does not match') 
        }

        setLoading(true)

        https.post(`${nextApi}/api/update-password`, {
            old_password: oldPassRef.current.value,
            new_password: newPassRef.current.value
        })
        .then((res) => {
            setMessage(res.data.message)
            setTimeout(() => router.back(), 1500)

        }).catch((err) => {
            if (err.response.status === 401) {
                setTimeout(() => {
                    router.push('/auth/login')
                }, 1500);
            }
            const error = err.response?.data ? err.response.data : 'Something went wrong'
            setError(error);
        }).finally(() => setLoading(false))
    }

    return (
        <FormLayout style={{ marginTop: '8.3rem', height: '400px' }}>
             <div className={authStyle['form-container']}>

                <h2> Update password </h2>
                <div className={authStyle['message-container']}>
                    <Alert message={message} error={error} />
                </div>

                <form onSubmit={handleOnSubmit} className={authStyle['form']}>

                    <Input placeholder='old password' 
                    type='password' minLength={8} 
                    required valueRef={oldPassRef}  />

                    <Input placeholder='New password' 
                    type='password' minLength={8} 
                    required valueRef={newPassRef}  />

                    <Input placeholder='Confirm new password'
                     type='password' minLength={8} 
                     required valueRef={confirmnewPassRef}  />

                    <Button value='Update name' loading={loading} />

                </form >

             </div>
        </FormLayout>
    )
}
