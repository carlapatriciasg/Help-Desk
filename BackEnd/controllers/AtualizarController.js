const Usuario = require('../models/usuarioModelo')
const Analista = require('../models/AnalistaModelo')
const bcrypt = require('bcryptjs')
const validator = require('validator')
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

exports.esqueciSenha = async (req, res) =>{
    const { email, confirmSenha, senhaNova } = req.body

    let usuario = await Usuario.findOne({where: {email}})
    if (!usuario) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    
    try {
    if(!senhaNova){
        return res.status(422).json({msg: 'A senha é obrigatório'})
    }
    if(!confirmSenha){
        return res.status(422).json({msg: 'A senha de confirmação é obrigatório'})
    }
    if(!validator.isLength(senhaNova, {min: 8, max: 20})){
            return res.status(422).json({msg: 'A senha deve ter de 8 a 20 caracteres'})
    }
    if(!validator.isAlphanumeric(senhaNova)){
        return res.status(422).json({msg: 'A senha deve conter letras e numeros'})
    }
    if(senhaNova !== confirmSenha){
       return res.status(422).json({msg: 'As senhas não conferem '})
    }

    usuario.senha = await bcrypt.hash(senhaNova, 12)
    await usuario.save()

    res.json({ msg: 'Dados atualizados' })
    }catch(erro){
        console.error('Erro ao redefinir senha: ', erro)
        return res.status(500).json({ msg: 'Erro interno do servidor' })
    }
}
exports.perfilDados = async (req, res) =>{
    const { email } = req.query

    let usuario = await Usuario.findOne({ where: { email }})

    if (!usuario) {
        usuario = await Analista.findOne({ where: { email }})
    }

    res.json({nome: usuario.nome, email: usuario.email})
}