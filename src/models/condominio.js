const condominio = (sequelize, DataTypes) => {

  const Condominio = sequelize.define('Condominio', {
      nombre: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      correo: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true
      },
      password: {
          type: DataTypes.TEXT,
          allowNull: false
      },
      telefono: {
          type: DataTypes.STRING(20)
      }
  }, {
      freezeTableName: true,
      tableName: 'condominios',
      timestamps: false
  });
  
  Condominio.associate = (models) => {
      Condominio.hasMany(models.Propietario);
  }

  return Condominio;
}

module.exports = condominio;
