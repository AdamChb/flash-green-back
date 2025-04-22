// api/index.js
const express = require("express");
const cors = require("cors");
const db_question = require("../database/question");
const app = express();

require("dotenv").config();

const db = require("../database/connection");
const connection = db.connection;

function end() {
  db.disconnectFromDatabase(connection);
}

app.use(cors("http://localhost:3000"));

app.get("/", (req, res) => {
  res.send("Hello depuis Express.js sur Vercel ! 🚀");
});

app.get("/question", async (req, res) => {
  const questionId = req.query.id;

  if (questionId) {
    const question = await db_question.getQuestion(connection, questionId);
    if (question) {
      res.send(question);
    } else {
      res.status(404).json({ error: "Questions not found" });
    }
  } else {
    const questions = await db_question.getAllQuestions(connection);
    if (questions) {
      res.send(questions);
    } else {
      res.status(404).json({ error: "No question found" });
    }
  }
});

module.exports = { app, end };
