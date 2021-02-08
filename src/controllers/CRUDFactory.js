const { internalHandler } = require('../utils/errorHandler');

exports.getAll = (Model, options) => async (req, res) => {
  const queryOptions = options ? options : {};
  queryOptions.where = {}

  // Si hay algun parametro, quiere decir que solo se quieren obtener los
  // resultados de un determinado recurso. Por ejemplo: Si se visita
  // la ruta: condominios/2/propietarios, en este caso el "2" es el id
  // del condominio del cual se quieren obtener los propietarios.
  if(Object.keys(req.params).length > 0) {
    const param = Object.keys(req.params)[0];

    queryOptions.where.id = req.params[param];
  }

  //if(req.params.ownerId) queryOptions.where.id = req.params.ownerId;
  
  try {
    const records = await Model.findAll(queryOptions);

    res.status(200).json({
      status: 'success',
      data: {
        records
      }
    })
  } catch (err) {
    internalHandler(err, res);
  }
}

exports.deleteOne = Model => async (req, res) => {

  let clause = {
    id: req.condominioID
  }

  if(req.propietarioId) {

    clause = {
      id: req.propietarioId,
      CondominioId: req.condominioID
    }
  }

  try {
    await Model.destroy({
      where: clause
    });

    res.status(204).json({
      status: 'success',
      msg: 'Object deleted successfully'
    });
  } catch(err){
    internalHandler(err, res);
  }
}

exports.getOne = Model => async (req, res) => {

  let clause = {
    id: req.condominioID
  }

  if(req.propietarioId) {

    clause = {
      id: req.propietarioId,
      CondominioId: req.condominioID
    }
  }


  try {
    const record = await Model.findOne({ where: clause });

    if(!record){
      return res.status(404).json({
        status: 'fail',
        msg: 'The record requested does not exist.'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        record
      }
    })
  } catch (err) {
    internalHandler(err, res);
  }
}

exports.updateOne = Model => async (req, res) => {

  const fields = Object.keys(req.body);

  let clause = {
    id: req.condominioID
  }

  if(req.propietarioId) {

    clause = {
      id: req.propietarioId,
      CondominioId: req.condominioID
    }
  }

  try {
    await Model.update({...req.body}, {
      where: clause,
      fields: fields
    });

    const updatedRecord = await Model.findOne({ where: { id: req.condominioID } });

    res.status(200).json({
      status: 'success',
      data: updatedRecord
    })
  } catch(err) {
    console.log(err);
    internalHandler(err, res);
  }
  

}

exports.createOne = (Model, uniqueCol) => async (req, res) => {
  // Clause sera usado como clausula en la condicion where
  let clause = {};

  /*
  UniqueCol debe ser un array con todas las columnas cuyos valores no deberian repetirse,
  en caso de haber varias, se agregaran a la clausula de la siguiente forma:
  {'inmueble': 'pb-a', 'email': 'example@gmail.com'}, esta clausula es inferida
  en sequelize como una operacion AND, en este caso se chequea si ya existe un
  registro que contenga el inmueble pb-a con el email example@gmail.com.
   */
  uniqueCol.forEach(field => {
    clause[field] = req.body[field]
  })

  let newRecord = req.body;

  if(req.params) {

    const param = Object.keys(req.params)[0];

    newRecord = {
      [param]: req.params[param],
      ...req.body
    }
  }

  try {
    const [instance, created] = await Model.findOrCreate({
      where: clause,
      defaults: {
        ...newRecord
      }
    });

    if(!created){
      return res.status(409).json({
        status: 'fail',
        msg: `The record already exist.`
      });
    }

    return res.status(201).json({
      status: 'success',
      msg: 'Reacord succesfully created',
      data: {
        instance
      }
    });
  } catch(error) {
    internalHandler(error, res);
  }
}