const express = require('express');

const verifyToken = require('../auth/verify-token');

const condominioController = require('../controllers/condominioController');

const router = express.Router();

router.param('CondominioId', (req, res, next, id) => {
  req.condominioID = id;
  next();
});

router.param('PropietarioId', (req, res, next, id) => {
  req.propietarioId = id;
  next();
});

router
  .route('/')
  .get(condominioController.getAllCondominios);

router
  .route('/:CondominioId')
  .get(verifyToken, condominioController.getOneCondominio)
  .patch(verifyToken, condominioController.updateOneCondominio);

router
  .route('/:CondominioId/propietarios')
  .get(verifyToken, condominioController.getAllPropietarios)
  .post(verifyToken, condominioController.createOnePropietario)

router
  .route('/:CondominioId/propietarios/:PropietarioId')
  .get(verifyToken, condominioController.getOnePropietario)
  .patch(verifyToken, condominioController.updateOnePropietario)
  .delete(verifyToken, condominioController.deleteOnePropietario)

module.exports = router;