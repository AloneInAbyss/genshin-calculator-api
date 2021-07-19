const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

const charactersRouter = require('./routes/characters');
const router = require('./routes/router');

app.use(charactersRouter);
app.use(router);

app.listen(port, () => console.log(`Servidor escutando na porta ${port}`));
