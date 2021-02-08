const { Propietario, uniqueColumns } = require('../models');
const factory = require('./CRUDFactory');

exports.getAllOwners = factory.getAll(Propietario);
// exports.getAllOwnersDebts = factory.getAll(Propietario, {
//   // Esta linea hace que se vean las deudas de cada propietario.
//   include: [
//     { model: Debt, required: true }
//   ]
// });
exports.getAllOwnersDebts = factory.getAll(Propietario);
exports.createOwner = factory.createOne(Propietario, uniqueColumns.propietarios);
exports.getOneOwner = factory.getOne(Propietario);
// exports.updateOneOwner = factory.updateOne(Propietario);
exports.deleteOneOwner = factory.deleteOne(Propietario);

exports.updateOneOwner = Propietario => async (req, res) => {

  const fields = Object.keys(req.body);

  console.log(fields);
  console.log(req.params);

  try {
    // await Model.update({...req.body}, {
    //   where: {
    //     id: idValue
    //   },
    //   fields: fields
    // });

    // const updatedRecord = await Model.findOne({ where: { id: req.resourceID } });

    res.status(200).json({
      status: 'success',
      data: {}
    })
  } catch(err) {
    console.log(err);
    internalHandler(err, res);
  }
  

}