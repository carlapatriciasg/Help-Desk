const { DataTypes } = require('sequelize');
const db = require('../connection/db');
const ChamadoHistorico = require('./ChamadoHistorico');

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
    tableName: 'Chamado',
    timestamps: true
});

// Associação entre Chamado e ChamadoHistorico
Chamado.hasMany(ChamadoHistorico, { foreignKey: 'chamadoId', as: 'historico' });
ChamadoHistorico.belongsTo(Chamado, { foreignKey: 'chamadoId', as: 'chamado' });

Chamado.createChamado = async ({ id,titulo, userEmail, categoria, subcategoria, prioridade, descricao, anexo}) => {
    const chamado = Chamado.create({ 
        id,
        titulo,
        userEmail, 
        categoria, 
        subcategoria, 
        prioridade, 
        descricao,
        anexo 
    });
    await ChamadoHistorico.create({
      chamadoId: chamado.id,
      type: 'Criação',
      user: chamado.userEmail,
      analista: chamado.agente,
      detalhes: 'Chamado criado'
    })

    return chamado
  };

  module.exports = Chamado
