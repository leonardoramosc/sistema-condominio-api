const jwt = require('jsonwebtoken');

function auth (req, res, next) {

  const token = req.header('auth-token');

  if(!token) {

    return res.status(400).send('Invalid token');
  }

  try {

    const verified = jwt.verify(token, process.env.TOKEN);

    let condominioID = req.params['CondominioId'];
    condominioID = parseInt(condominioID, 10)

    if(verified._id === condominioID) {
      
      req.condominio = verified;

      next();
    
    } else {

      return res.status(400).send('Wrong resource request');
    } 

  } catch(err) {
    return res.status(400).send('invalid token')
  }
}

module.exports = auth;