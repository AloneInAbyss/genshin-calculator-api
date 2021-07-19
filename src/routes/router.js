const express = require('express');
const router = express.Router();

router.all('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({});
});

module.exports = router;
