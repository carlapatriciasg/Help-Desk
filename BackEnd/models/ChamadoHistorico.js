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
        references: {
            model: 'Chamado',
            key: 'id'
        }
    },
    type: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
    },
    detalhes: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    } 
},{
    tableName: 'ChamadoHistorico',
    timestamps: false
});

module.exports = ChamadoHistorico;