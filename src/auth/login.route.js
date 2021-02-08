const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Condominio } = require('../models')
const { internalHandler } = require('../utils/errorHandler');

const router = express.Router();

router.route('/').post(login);

async function login(req, res) {

  const clause = {
    correo: req.body.correo
  }

  try {
    const condominio = await Condominio.findOne({ where: clause });

    if (condominio === null) {

      // No puede hacer login, el correo no existe.
      return res.status(400).json({
        status: 'fail',
        msg: 'Invalid Email'
      })
    } else {

      // revisar si la contraseña es correcta.
      const validPassword = await bcrypt.compare(req.body.password, condominio.password);

      if (!validPassword) {

        return res.status(400).json({
          status: 'fail',
          msg: 'Incorrect password'
        });
      } 

      // crear json web token
      const token = jwt.sign({_id: condominio.id}, process.env.TOKEN);
      
      res.header('auth-token', token).send(token);
    }
  } catch(err) {
    internalHandler(err, res);
  }
}

module.exports = router;