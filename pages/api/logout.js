import cookie from 'cookie'

export default async function logOut(req, res) {

  try {
    res.setHeader('Set-Cookie', 'access_token_cookie=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(200).json({msg: 'Logged out successfully'})
  } catch (err) {
    res.status(400).json({err: 'Error, Please try again'})
  }
}
