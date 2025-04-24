const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initPool, closePool, handleDatabaseError } = require('./db'); // Importer handleDatabaseError
const app = express();

initPool(); // Initialiser le pool de connexions à la base de données

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://flash-green.arcktis.fr',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.redirect('https://flash-green.arcktis.fr/');
});

// Gestion de l'arrêt du serveur
process.on('SIGINT', async () => {
  console.log('Gracefully shutting down...');
  await closePool(); // Fermer le pool de connexions
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Gracefully shutting down...');
  await closePool(); // Fermer le pool de connexions
  process.exit(0);
});

// Gestion des erreurs non capturées
process.on('uncaughtException', async (err) => {
  console.error('Uncaught exception:', err);
  await handleDatabaseError(err); // Gérer l'erreur et redémarrer le pool si nécessaire
  process.exit(1);
});

process.on('unhandledRejection', async (reason) => {
  console.error('Unhandled promise rejection:', reason);
  await handleDatabaseError(reason); // Gérer l'erreur et redémarrer le pool si nécessaire
  process.exit(1);
});

module.exports = app;