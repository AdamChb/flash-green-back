// api/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello depuis Express.js sur Vercel ! 🚀');
});

app.use(cors({
  origin: 'https://flash-green.arcktis.fr',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

module.exports = app;
