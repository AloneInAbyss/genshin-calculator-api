// Dependências
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Configurações
dotenv.config();

// Inicializações
const app = express();
const port = process.env.PORT;
const router = require('./router');

// Diretórios
const publicPath = path.resolve(__dirname, '../public');

// Roteamento
app.use(express.static(publicPath));
app.use(router);

// Web Server
app.listen(port, () => console.log(`Servidor escutando na porta ${port}`));