const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database.js");
const Contrato = require("./contrato.js");

const TrabajadorAutorizado = sequelize.define("trabajador_autorizado", {
  id_trabajador_autorizado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_contrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Contrato,
      key: 'id_contrato'
    }
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carnet_identidad: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [11, 11],
        msg: "El carnet de identidad debe tener exactamente 11 caracteres"
      }
    }
  },
  num_telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true
});

TrabajadorAutorizado.associate = function(models) {
  TrabajadorAutorizado.belongsTo(models.Contrato, {
    foreignKey: 'id_contrato',
    as: 'contrato'
  });
};

module.exports = TrabajadorAutorizado;
