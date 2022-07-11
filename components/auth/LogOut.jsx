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

        https(`${nextApi}/api/logout`)
        .then((res) => {
            if (res.data.msg === 'Logged out successfully') {
                router.push('/auth/login')
                actions({type: 'SET_AUTH', payload: false})
            }
        }).catch((err) => {
            setError('Something went wrong')
        }).finally(() => setLoading(false))
    }

    return (
        <Button style={{backgroundColor: '#dc3545'}} value='Logout' onClick={handleLogOut} loading={loading} />
    )
}

export default LogOut