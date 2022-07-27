import { useRouter } from 'next/router'
import { useContext } from 'react'
import { nextApi } from '../../config'
import { Context } from '../../context/useGlobal'
import https from '../../helpers/https'
import Button from '../styled-component/Button'


const LogOut = ({ setLoading, setError, loading }) => {

    const { actions } = useContext(Context)
    const router = useRouter()

    const handleLogOut = (e) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        https.post(`${nextApi}/api/logout`, {
            key: 'static_key'
        })
        .then((res) => {
            router.push('/auth/login')
            actions({type: 'SET_AUTH', payload: false})
        }).catch((err) => {
            setError('Something went wrong')
        }).finally(() => setLoading(false))
    }

    return (
        <Button danger={true} value='Logout' onClick={handleLogOut} loading={loading} />
    )
}

export default LogOut