const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/images/:name', (req, res) => {
  res.setHeader('Content-Type', 'image/png');
  const URL = path.resolve(__dirname, `../public/images/${req.params.name}.png`);
  res.sendFile(URL);
});

router.all('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({});
});

module.exports = router;
