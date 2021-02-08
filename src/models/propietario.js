const propietario = (sequelize, DataTypes) => {
  const Propietario = sequelize.define('Propietario', {
      nombre: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      inmueble: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true
      },
      correo: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true
      },
      telefono: {
          type: DataTypes.STRING(20)
      }
  }, {
      freezeTableName: true,
      tableName: 'propietarios',
      timestamps: false
  });
  
  Propietario.associate = (models) => {
      Propietario.belongsTo(models.Condominio);
  }

  return Propietario;
}

module.exports = propietario;