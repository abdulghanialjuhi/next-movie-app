import https from '../../helpers/https'
import cookie from 'cookie'
import { server } from '../../config'

export default async function login(req, res) {
    
    console.log(`server: ${server}/login`);
    try {
        const login = await https.post(`${server}/login`, {
            ...req.body
        })

        const { access_token } = login.data

        res.setHeader('set-cookie',  cookie.serialize('access_token_cookie', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
        }))
    
        res.status(200).json(login.data)

    } catch (err) {
        console.log('err: ', err);
        const msg = err.response?.data?.message ? err.response.data.message : 'Something went wrong'
        const status = err.response?.status ? err.response.status : 500
        res.status(status).json(msg)
    }
}
