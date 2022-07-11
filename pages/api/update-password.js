import updateToken from '../../helpers/updateToken';

const handler = async (req, res, response) => {

  try {
    res.status(response.status).json(response.data)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
  
}

export default updateToken(handler, '/update_password', 'post')