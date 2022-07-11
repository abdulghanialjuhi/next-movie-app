import https from '../../helpers/https'
import { server } from '../../config'

export default async function handler(req, res) {
    
    try {
        const signUp = await https.post(`${server}/sign-up`, {
            'user-name': req.body.userName,
            'name': req.body.name,
            'email': req.body.email,
            'password': req.body.password
        })
        res.status(200).json(signUp.data)

    } catch (err) {

        const msg = err.response?.data?.message ? err.response.data.message : 'Something went wrong'

        const status = err.response?.status ? err.response.status : 500
        res.status(status).json(msg)
    }
}
