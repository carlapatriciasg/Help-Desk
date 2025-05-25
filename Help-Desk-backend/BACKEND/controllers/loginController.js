const Usuario = require('../models/usuarioModelo') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const{ email, senha } = req.body

    // verificação se email e senha foram digitados 
    if(!email){
        return res.status(422).json({msg: 'O e-mail é obrigatório'})
    }
    if(!senha){
        return res.status(422).json({msg: 'A senha é obrigatório'})
    }

    const usuarioExiste = await Usuario.checkEmailExists(email)
    //verificar se usuario esta no cadastro
    if (!usuarioExiste) {
        return res.status(404).json({ message: 'E-mail não cadastrado.' });
   }

   //verificar senha 
   const checkSenha = await bcrypt.compare(senha, usuarioExiste.senha)

   if(!checkSenha) {
    return res.status(422).json({msg: 'Senha invalida'})
   }
   
   // captura de erro na validação de acesso por id
   try{
    //const secret = process.env.SECRET

    /*const token = jwt.sign(
        {
            id: usuarioExiste._id
        },
        secret,
    )*/
        res.status(200).json({msg: 'Autenticação realizada com sucesso'})
   }catch(err) {
    console.log(err)

    res.status(500).json({
        msg: 'error no servidor, tente novamente'
    })
   }
}