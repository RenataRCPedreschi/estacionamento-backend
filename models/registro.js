const { DataTypes, UUID } = require("sequelize");
const { connection } = require("../database/database");
const Usuario = require("./usuario");

const Registro = connection.define('registro', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true
    },
});

Vaga.hasMany(Registro, {
    onDelete: "CASCADE"
  });
// Faltando implementar o model de avaliacao
Registro.belongsTo(Avaliacao);
Registro.belongsTo(Usuario);
Registro.belongsTo(Vaga);
Usuario.hasMany(Registro, {onDelete: "CASCADE"});
module.exports = Usuario;
