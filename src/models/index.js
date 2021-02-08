const { Sequelize, DataTypes } = require('sequelize');
const { DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, ENV } = require('../config/settings');

const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    port: DB_PORT,
    logging: ENV === "development" ? console.log : false
});

const models = {
  Condominio: require('./condominio')(sequelize, DataTypes),
  Propietario: require('./propietario')(sequelize, DataTypes)
}

// Crear las asociaciones de cada modelo en caso de que existan
Object.keys(models).forEach(model => {
  if(models[model]['associate']){
    models[model].associate(models);
  }
});

const uniqueColumns = {
  condominios: ['nombre', 'correo'],
  propietarios: ['inmueble', 'correo']
}

module.exports = {
  sequelize,
  Condominio: models.Condominio,
  Propietario: models.Propietario,
  uniqueColumns
};