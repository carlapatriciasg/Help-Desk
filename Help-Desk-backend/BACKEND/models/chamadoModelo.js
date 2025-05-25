const { DataTypes } = require('sequelize');
const db = require('../connection/db');

const Chamado = db.define('chamado', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    userEmail: {
        type: DataTypes.STRING,
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subcategoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prioridade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, 
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Aberto',
    },
    agente: {
        type: DataTypes.STRING,
    },
    anexo: {
        type: DataTypes.BLOB
    }
},{
    tableNome: 'Chamado',
    timestamp: true
});

Chamado.createChamado = async ({ titulo, userEmail, categoria, subcategoria, prioridade, descricao, anexo}) => {
    return Chamado.create({ 
        id,
        titulo,
        userEmail, 
        categoria, 
        subcategoria, 
        prioridade, 
        descricao,
        anexo 
    });
  };  

  module.exports = Chamado