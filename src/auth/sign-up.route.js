const express = require('express');

const condominioController = require('../controllers/condominioController');

const router = express.Router();

router
  .route('/')
  .post(condominioController.createCondominio);


  module.exports = router;