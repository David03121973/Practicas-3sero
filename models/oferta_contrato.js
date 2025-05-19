const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database.js");

const OfertaContrato = sequelize.define("oferta_contrato", {
  id_oferta_contrato: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_oferta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_contrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

OfertaContrato.associate = function(models) {
  OfertaContrato.belongsTo(models.Oferta, {
    foreignKey: 'id_oferta',
    as: 'oferta',
  });
  OfertaContrato.belongsTo(models.Contrato, {
    foreignKey: 'id_contrato',
    as: 'contrato',
  });
};

module.exports = OfertaContrato;