import { useEffect, useContext } from 'react';
import { Context } from '../../../context/useGlobal'
import { NoPageFlicker } from '../../layout/NoPage'

export default function WithAuth({ children }) {

    const { isAuth } = useContext(Context)

    useEffect(() => {
      document.documentElement.classList.add('render');
    }, []);

    if (!isAuth) {
        return <NoPageFlicker />
    }

    return <>{children}</>
}
