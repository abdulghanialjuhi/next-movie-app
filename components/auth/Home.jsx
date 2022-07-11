import React from 'react'
import { useState, useContext } from 'react';
import Nav from './Nav'
import LogIn from './LogIn'
import SignUp from './SignUp'
import FormLayout from './layout/FormLayout';
import { Context } from '../../context/useGlobal';

export default function Home() {

    const [isSignUp, setIsSignUp] = useState(false);
    const { isAuth } = useContext(Context)

    return (
        <>
           {!isAuth && <Nav 
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp} />}
            <FormLayout style={{ height: isSignUp && '450px' }}>
                { !isSignUp ? <LogIn /> : <SignUp setIsSignUp={setIsSignUp} /> }
            </FormLayout>
        </>
    )
}
