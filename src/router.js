// Dependências
const express = require('express');
const path = require('path');
const router = express.Router();

// Diretórios
const indexPath = path.join(__dirname, '../public', 'index.html');

/*    Rotas    */
router.all('*', (req, res) => {
  res.sendFile(indexPath);
});
/*             */

module.exports = router;