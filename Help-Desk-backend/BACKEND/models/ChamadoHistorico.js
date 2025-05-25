const { DataTypes } = require('sequelize');
const db = require('../connection/db');

const ChamadoHistorico = db.define('ChamadoHistorico',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chamadoId: {
        type: DataTypes.STRING,
        allowNull: false,
        referencia: {
            model: 'Chamado',
            key: 'id'
        }
    },
    type: DataTypes.STRING,
    user: DataTypes.STRING,
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },    
    detalhes: DataTypes.TEXT
});

module.exports = ChamadoHistorico;