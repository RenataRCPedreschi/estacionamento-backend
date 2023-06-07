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
    DataHora_Chegada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DataHora_Saida: {
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
Usuario.hasMany(Registro, {onDelete: "CASCADE"});
module.exports = Usuario;
