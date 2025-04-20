// api/index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello depuis Express.js sur Vercel ! 🚀');
});

module.exports = app;
