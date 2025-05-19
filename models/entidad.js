const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database.js");

const Entidad = sequelize.define("entidad", {
  id_entidad: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuenta_bancaria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_entidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo_reo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo_nit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true
});

// Relaciones definidas en el método associate (evitando importar Contrato aquí)
Entidad.associate = function(models) {
  Entidad.hasMany(models.Contrato, { 
    foreignKey: 'id_entidad',
    onDelete: 'CASCADE' // Opcional: elimina contratos si se borra la entidad
  });
};

module.exports = Entidad;