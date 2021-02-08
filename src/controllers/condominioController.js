const bcrypt = require('bcryptjs');

const { Condominio, Propietario, uniqueColumns } = require('../models');

const factory = require('./CRUDFactory');
const { internalHandler } = require('../utils/errorHandler');

exports.getAllCondominios = factory.getAll(Condominio);
// exports.createCondominio = factory.createOne(Condominio, uniqueColumns.condominios);
exports.getOneCondominio = factory.getOne(Condominio);
exports.updateOneCondominio = factory.updateOne(Condominio);

exports.getAllPropietarios = factory.getAll(Condominio, {
  // Esta linea hace que se vean las deudas de cada propietario.
  include: [
    { model: Propietario, required: true }
  ]
});

exports.createOnePropietario = factory.createOne(Propietario, uniqueColumns.propietarios);

exports.getOnePropietario = factory.getOne(Propietario);
exports.updateOnePropietario = factory.updateOne(Propietario);
exports.deleteOnePropietario = factory.deleteOne(Propietario);

exports.createCondominio = async (req, res) => {
  // Clause sera usado como clausula en la condicion where
  let clause = {};

  /*
  UniqueCol debe ser un array con todas las columnas cuyos valores no deberian repetirse,
  en caso de haber varias, se agregaran a la clausula de la siguiente forma:
  {'inmueble': 'pb-a', 'email': 'example@gmail.com'}, esta clausula es inferida
  en sequelize como una operacion AND, en este caso se chequea si ya existe un
  registro que contenga el inmueble pb-a con el email example@gmail.com.
   */
  uniqueColumns.condominios.forEach(field => {
    clause[field] = req.body[field]
  })

  let newRecord = req.body;

  // revisar si el condominio existe
  try {

    const condominio = await Condominio.findOne({ where: clause });

    if (condominio === null) {
  
      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newRecord.password, salt);
      
      // asignar nueva contraseña
      newRecord.password = hashPassword;

      // crear condominio
      const newCondominio = await Condominio.create(newRecord);

      return res.status(201).json({
        status: 'success',
        condominio: newCondominio.nombre
      });

    } else {
  
      return res.status(409).json({
        status: 'fail',
        msg: `The record already exist.`
      });
    }

  } catch(err) {
    internalHandler(err, res);
  }
}