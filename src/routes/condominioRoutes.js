const express = require('express');

const condominioController = require('../controllers/condominioController');
const propietariosRoutes = require('./ownerRoutes');
// const debtRouter = require('./debtRoutes');

const router = express.Router();

// router.use('/:CondominioId/propietarios/:PropietarioId', propietariosRoutes);
// router.use('/:CondominioId/debts', debtRouter);

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
  .get(condominioController.getOneCondominio)
  .patch(condominioController.updateOneCondominio);

router
  .route('/:CondominioId/propietarios')
  .get(condominioController.getAllPropietarios)
  .post(condominioController.createOnePropietario)

router
  .route('/:CondominioId/propietarios/:PropietarioId')
  .get(condominioController.getOnePropietario)
  .patch(condominioController.updateOnePropietario)
  .delete(condominioController.deleteOnePropietario)

module.exports = router;