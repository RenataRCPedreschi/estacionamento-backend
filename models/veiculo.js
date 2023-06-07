const { DataTypes } = require("sequelize");
const { connection } = require ("../database/database");
const Usuario = require("./usuario");

const Veiculo = connection.define("veiculo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cor: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Usuario.hasMany(Veiculo, {
  onDelete: "CASCADE"
});
Veiculo.belongsTo(Usuario);
