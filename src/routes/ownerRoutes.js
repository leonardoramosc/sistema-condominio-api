const express = require('express');
const ownerController = require('../controllers/ownerController');

const router = express.Router();

router.param('ownerId', (req, res, next, id) => {
  req.resourceID = id;
  next();
});

//router.use('/:ownerId/debts', debtRouter);

router
  .route('/')
  .get(ownerController.getAllOwners)
  .post(ownerController.createOwner);

// router
//   .route('/deudas')
//   .get(ownerController.getAllOwnersDebts);

router
  .route('/:ownerId')
  .get(ownerController.getOneOwner)
  .patch(ownerController.updateOneOwner)
  .delete(ownerController.deleteOneOwner);

// router
//   .route('/:ownerId/deudas')
//   .get(ownerController.getAllOwnersDebts);

module.exports = router;