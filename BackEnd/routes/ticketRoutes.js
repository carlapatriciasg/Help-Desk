const express = require('express')
const router = express.Router()
const chamadoController = require('../controllers/chamadoController')

router.post('/abertura', chamadoController.Abertura);

router.get('/chamados-abertos', chamadoController.ChamadoDoUsuarios)

router.get('/chamados-lista', chamadoController.TodosChamados)

router.get('/lista-todos-chamados', chamadoController.ListaTodosChamados)

router.get('/contador-chamados', chamadoController.chamadosContador)

router.get('/chamados-relatorios', chamadoController.ChamadoRelatorio)

router.get('/chamado/:id', chamadoController.BuscarChamadoPorId);

module.exports = router
