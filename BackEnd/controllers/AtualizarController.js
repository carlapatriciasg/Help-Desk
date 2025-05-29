const Usuario = require('../models/usuarioModelo')
const Analista = require('../models/AnalistaModelo')
const bcrypt = require('bcryptjs')
const { where } = require('sequelize')

exports.atualizarDados = async (req, res) =>{
    const { email, nome, senhaAtual, senhaNova } = req.body

    let usuario = await Usuario.findOne({where: {email}})
    
    if(!usuario) {
        usuario = await Analista.findOne({where: { email }})
    }

    if(!usuario){
        return res.status(404).json({msg: 'Usuario não localizado'})
    }

    
    if(nome){
        usuario.nome = nome
    }

    
    if(senhaAtual && senhaNova){
        const checkSenha = await bcrypt.compare(senhaAtual, usuario.senha)
        if(!checkSenha){
            return res.status(422).json({msg: 'Senha incorreta'})
        }    
        usuario.senha = await bcrypt.hash(senhaNova, 12)
    }

    await usuario.save()
    res.json({ msg: 'Dados atualizados' })
}

exports.perfilDados = async (req, res) =>{
    const { email } = req.query

    let usuario = await Usuario.findOne({ where: { email }})

    if (!usuario) {
        usuario = await Analista.findOne({ where: { email }})
    }

    res.json({nome: usuario.nome, email: usuario.email})
}