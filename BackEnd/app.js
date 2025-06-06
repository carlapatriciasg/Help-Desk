//importações
require('dotenv').config()
const express = require('express')
const cors = require('cors');
const sequelize = require('../BackEnd/connection/db')
const userRoutes = require('../BackEnd/routes/userCRoutes')
const authRoutes = require('../BackEnd/routes/authRoutes')
const ticketRoutes = require('../BackEnd/routes/ticketRoutes')
const dadosRouter = require('../BackEnd/routes/dadosRouter')
const emailRoutes = require('../BackEnd/routes/EmailRoutes')

const app = express()
app.use(cors({origin: 'http://127.0.0.1:5500'}))
app.use(express.json())


sequelize.sync().then(() => {
    console.log("Banco sincronizado com sucesso");
}).catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
});

app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/api', ticketRoutes)
app.use('/api', dadosRouter)
app.use('/api', emailRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});