const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database.js");

const Oferta = sequelize.define("oferta", {
  id_oferta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isAfterStart(value) {
        if (this.fecha_inicio && value <= this.fecha_inicio) {
          throw new Error("La fecha de fin debe ser posterior a la fecha de inicio");
        }
      },
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Oferta.associate = function(models) {
  Oferta.belongsTo(models.Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario',
  });
  Oferta.hasMany(models.OfertaContrato, {
    foreignKey: 'id_oferta',
    onDelete: 'CASCADE',
  });
};

module.exports = Oferta;