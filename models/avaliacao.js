const { DataTypes, UUID } = require("sequelize");
const { connection } = require("../database/database");
const Usuario = require("./usuario");
const Registro = require("./registro");


const Avaliacao = connection.define('avaliacao', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    comentario: {
        type: DataTypes.STRING
    },
    nota: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
});

Registro.hasMany(Avaliacao, {
    onDelete: "CASCADE"
  });
Usuario.hasMany(Avaliacao, {onDelete: "CASCADE"});

Avaliacao.belongsTo(Registro);
Avaliacao.belongsTo(Usuario);
Avaliacao.belongsTo(Registro);

module.exports = Avaliacao;
