import cookie from 'cookie'

export default async function logOut(req, res) {

  try {
    res.setHeader('set-cookie', 
    cookie.serialize('access_token_cookie', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: 'none',
        path: '/'
    }))
    res.status(200).json({msg: 'Logged out successfully'})
  } catch (err) {
    res.status(400).json({err: 'Error, Please try again'})
  }
}
