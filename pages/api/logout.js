import cookie from "cookie";

export default (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ status: 'fail', message: 'Method not allowed here!' });

  if (req.body.key === 'static_key') {
    res.setHeader('Set-Cookie', 'access_token_cookie=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');

    return res.status(200).json({ roles: null, auth: false });
  }

  return res.status(400).json({ status: 'fail', message: 'Bad request happened!' });
};