const express = require('express')
const router = express.Router()
const AtualizarController = require('../controllers/AtualizarController')

router.put('/dados', AtualizarController.atualizarDados)

router.get('/perfil', AtualizarController.perfilDados)

module.exports = router