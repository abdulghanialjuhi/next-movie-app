import FormLayout from './layout/FormLayout'
import authStyle from '../../styles/auth.module.scss'
import { useState, useRef, useEffect, useContext } from 'react'
import { nextApi } from '../../config'
import Input from '../styled-component/Input'
import Button from '../styled-component/Button'
import https from '../../helpers/https'
import Alert from '../styled-component/Alert'
import { Context } from '../../context/useGlobal'
import { useRouter } from 'next/router'

export default function UpdateName() {

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false);

    const nameRef = useRef()

    const { actions, name } = useContext(Context)
    const router = useRouter()

    useEffect(() => {
        nameRef.current.value = name
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setError(null)
        setMessage(null)

        if (nameRef.current?.value === name) return

        setLoading(true)

        https.post(`${nextApi}/api/update-name`, {
            name:  nameRef.current.value,
        })
        .then((res) => {
            setMessage(res.data.message)
            actions({type: 'SET_NAME', payload: nameRef.current.value})
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
        <FormLayout style={{ marginTop: '8.3rem' }}>
            <div className={authStyle['form-container']}>

                <h2> Update name </h2>
                <div className={authStyle['message-container']}>
                    <Alert message={message} error={error} />
                </div>

                <form onSubmit={handleOnSubmit} className={authStyle['form']}>
                    <Input placeholder='Name' required valueRef={nameRef}/>
                    <Button value='Update name' loading={loading} />
                </form >

            </div>
        </FormLayout>
    )
}
