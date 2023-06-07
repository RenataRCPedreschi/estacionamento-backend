const { DataTypes } = require("sequelize");
const { connection } = require ("../database/database");

const Vaga = connection.define('vaga', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    localizacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"carro"
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"livre"
    },
})

module.exports = Vaga;