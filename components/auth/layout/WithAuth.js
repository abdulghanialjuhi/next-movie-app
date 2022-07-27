import React, { useContext } from 'react'
import { Context } from '../../../context/useGlobal'
import Loader from '../../styled-component/Loader'

export default function WithAuth({ children }) {

    const { isAuth } = useContext(Context)

   if (!isAuth) return <Loader />

   return (
    <>
        {children}
    </>
    )
}
