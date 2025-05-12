const { DataTypes } = require('sequelize');
const db = require('../connection/db');

const Usuario = db.define('usuario' , {
    id :{
        type: DataTypes.INTEGER,
        allowNull: false, 
        autoIncrement: true , 
        primaryKey: true
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
    tipoUsuario : {
        type: DataTypes.STRING,
        //allowNull: false, 
    },
});

Usuario.checkEmailExists = async (email) => {
    const user = await Usuario.findOne({ where: { email } });
    return !!user;
  };
  
  // Método para criar novo usuário
  Usuario.createUser = async ({ email, senha, datanasc, cep, tipoUsuario }) => {
    return Usuario.create({ email, senha, datanasc, cep, tipoUsuario });
  };  

module.exports = Usuario;