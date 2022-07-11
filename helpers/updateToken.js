import https from "./https";
import cookie from 'cookie'
import { server } from "../config";

const updateToken = (handler, url, method) => {
    return async (req, res) => {

        if (method.toUpperCase() !== req.method) {
            return res.status(405).json({err: 'Method not allowed'})
        }

        const csrfCookie = req.cookies.access_token_cookie

        const opt = {
            data: {...req.body},
            headers: {
            Authorization: csrfCookie ? `Bearer ${csrfCookie}` : null,
            },
            method
        }

        try {
            const response = await https( server + url, opt)
            if (response.data?.is_refresh) {
                res.setHeader('set-cookie', 
                cookie.serialize('access_token_cookie', response.data.is_refresh, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                })
            )}
    
            return handler(req, res, response)
        } catch (err) {
            const status = err.response?.status ? err.response.status : 500
            const msg = err.response.data?.message ? err.response.data.message : err.message
            return res.status(status).json(msg)
        }
     
    }
}

export default updateToken;