const express = require('express')
const router = express.Router()
const chamadoController = require('../controllers/chamadoController')

router.post('/abertura', chamadoController.Abertura);

router.get('/chamados-abertos', chamadoController.ChamadoDoUsuarios)

module.exports = router