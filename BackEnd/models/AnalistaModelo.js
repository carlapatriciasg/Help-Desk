const { DataTypes } = require('sequelize');
const db = require('../connection/db');

const Analista = db.define('analista' , {
    id :{
        type: DataTypes.INTEGER,
        allowNull: false, 
        autoIncrement: true , 
        primaryKey: true
    },
    nome :{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    email :{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    datanasc :{
        type : DataTypes.STRING,
        allowNull: false,
    },
    senha :{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    tipoUsuario : {
        type: DataTypes.STRING,
        default: 'analista', 
    },
});

Analista.checkEmailExists = async (email) => {
    const user = await Analista.findOne({ 
        where: { email }, 
        attributes: ['id', 'email', 'senha', 'tipoUsuario'] });
    return user;
  };
  
  // Método para criar novo analista
  Analista.createUser = async ({ nome,email, senha, datanasc, tipoUsuario }) => {
    return Analista.create({ nome ,email, senha, datanasc, tipoUsuario });
  };  

module.exports = Analista;