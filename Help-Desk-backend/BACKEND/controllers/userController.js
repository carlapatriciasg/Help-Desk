const Usuario = require('../models/usuarioModelo')
const bcrypt = require('bcryptjs')
const validator = require('validator')

exports.register = async (req, res) => {
    const {email, senha, confirmSenha, datanasc, cep, tipoUsuario} = req.body

    if(!email){
        return res.status(422).json({msg: 'O e-mail é obrigatório'})
    }
    if(!senha){
        return res.status(422).json({msg: 'A senha é obrigatório'})
    }

    if(!validator.isLength(senha, {min: 8, max: 20})){
        return res.status(422).json({msg: 'A senha deve ter de 8 a 20 caracteres'})
    }
    if(!validator.isAlphanumeric(senha)){
        return res.status(422).json({msg: 'A senha deve conter letras e numeros'})
    }
    if(senha !== confirmSenha){
        return res.status(422).json({msg: 'As senhas não conferem '})
    }
    if(!datanasc){
        return res.status(422).json({msg: 'A data de nascimento é obrigatório'})
    }
    if(!cep){
        return res.status(422).json({msg: 'O CEP é obrigatório'})
    }
    // checkand se o usuario existe 
    try{
    const usuarioExiste = await Usuario.checkEmailExists(email)

    if (usuarioExiste) {
        return res.status(422).json({ message: 'E-mail já cadastrado.' });
    }
    
    //cripitografando senha 
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha, salt)

    //criando user 
    await Usuario.create({
        senha: senhaHash,
        email,
        cep,
        datanasc,
    });
    
    return res.status(201).json({ msg: 'Usuario criado com sucesso'})

    } catch(error){
        console.log(error)

        res.status(500).json({
            msg: 'error no servidor, tente novamente mais tarde'
        })
    }
}
