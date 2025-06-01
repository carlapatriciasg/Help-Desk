const express = require('express')
const router = express.Router()
const AtualizarController = require('../controllers/AtualizarController')

router.put('/dados', AtualizarController.atualizarDados)

router.get('/perfil', AtualizarController.perfilDados)

router.put('/esqueci-senha', AtualizarController.esqueciSenha)

module.exports = router