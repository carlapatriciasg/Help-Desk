const express = require('express')
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const chamadoController = require('../controllers/chamadoController')

router.post('/abertura',upload.single('anexo'), chamadoController.Abertura);

router.get('/chamados-abertos', chamadoController.ChamadoDoUsuarios)

router.get('/chamados-lista', chamadoController.TodosChamados)

router.get('/lista-todos-chamados', chamadoController.ListaTodosChamados)

router.get('/contador-chamados', chamadoController.chamadosContador)

router.get('/chamados-relatorios', chamadoController.ChamadoRelatorio)

router.get('/chamado/:id', chamadoController.BuscarChamadoPorId);

router.post('/chamado/:id/resposta', chamadoController.chamadoRespota);

router.patch('/chamado/:id/vincular-analista', chamadoController.vincularAnalista);

router.patch('/chamado/:id/status', chamadoController.alterarStatus);

//router.get('/chamado/:id/anexo/:nome', chamadoController.DownloadAnexo)

module.exports = router
