import Link from 'next/link'
import React from 'react'
import { useState, useContext } from 'react'
import { Context } from '../../context/useGlobal'
import authStyle from '../../styles/auth.module.scss'
import FormLayout from './layout/FormLayout'
import LogOut from './LogOut'

export default function Dashboard() {

    const { name } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    return (
        <FormLayout style={{marginTop: '8.3rem'}}>
            <div className={authStyle['profile-container']}>
                <div className={authStyle['profile-pic']}>
                    <img src="/profile.svg" alt="" />
                </div>
                <div className={authStyle['info']}>
                    <h4> { name } </h4>
                </div>
                <div className={authStyle['update-info']}>
                    <Link href='/dashboard/update-name'>
                        <a> 
                            Update name
                        </a>
                    </Link>
                    <Link href='/dashboard/update-password'>
                        <a> 
                            Update password
                        </a>
                    </Link>
                </div>
            </div>
            <div className={authStyle['logout-container']}>
                <LogOut 
                loading={loading} 
                setLoading={setLoading} 
                setError={setError} />
            </div>
        </FormLayout>
    )
}
