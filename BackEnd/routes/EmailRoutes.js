const express = require('express');
const router = express.Router();
const enviomailController = require('../controllers/EmailController');


router.post('/enviar-email', enviomailController.enviarEmail);

module.exports = router;