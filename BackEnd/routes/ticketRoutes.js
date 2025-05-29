const express = require('express')
const router = express.Router()
const chamadoController = require('../controllers/chamadoController')

router.post('/abertura', chamadoController.Abertura);

router.get('/chamados-abertos', chamadoController.ChamadoDoUsuarios)

router.get('/chamados-lista', chamadoController.TodosChamados)

router.get('/contador-chamados', chamadoController.chamadosContador)

module.exports = router