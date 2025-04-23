// api/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello depuis Express.js sur Vercel ! 🚀');
});

// app.use(cors({
//   origin: 'https://flash-green.arcktis.fr',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

app.use((req, res, next) => {
  const allowedOrigins = ['https://flash-green.arcktis.fr'];
  const origin = req.get('Origin');

  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
});

module.exports = app;
