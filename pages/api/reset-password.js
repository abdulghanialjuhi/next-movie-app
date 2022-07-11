import { server } from '../../config'
import https from '../../helpers/https'

export default async function handler(req, res) {
    
    try {
        const signUp = await https.post(`${server}/reset-password`, {
            'email': req.body.email,
        })
        res.status(200).json(signUp.data)

    } catch (err) {
        const msg = err.response?.data?.message ? err.response.data.message : 'Something went wrong'
        const status = err.response?.status ? err.response.status : 500
        res.status(status).json(msg)
    }
}
