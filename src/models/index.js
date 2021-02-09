const { Sequelize, DataTypes } = require('sequelize');
const { ENV } = require('../config/settings');

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`;

const DB_URL = ENV === "production" ? process.env.DATABASE_URL : connectionString;

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: ENV === "production" ? dialectOptions : {}
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