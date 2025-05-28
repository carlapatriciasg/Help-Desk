const { DataTypes } = require('sequelize');
const db = require('../connection/db');

const Usuario = db.define('usuario' , {
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
    cep :{
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    rua :{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    bairro :{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    cidade :{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    uf :{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    tipoUsuario : {
        type: DataTypes.STRING,
        default: 'usuario',  
    },
});

Usuario.checkEmailExists = async (email) => {
    const user = await Usuario.findOne({ 
        where: { email }, 
        attributes: ['id', 'email', 'senha', 'tipoUsuario'] });
    return user;
  };
  
  // Método para criar novo usuário
  Usuario.createUser = async ({ nome,email, senha, datanasc, cep, rua, bairro, cidade, uf, tipoUsuario }) => {
    return Usuario.create({ nome ,email, senha, datanasc, cep,rua, bairro, cidade, uf, tipoUsuario });
  };  

module.exports = Usuario;