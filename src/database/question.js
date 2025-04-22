async function getQuestion(connection, questionId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM question WHERE id = ?";
    connection.query(query, [questionId], (error, results) => {
      if (error) {
        console.error("Error fetching card:", error.message);
        return reject(error);
      }
      if (results.length === 0) {
        return resolve(null); // No card found with the given ID
      }
      resolve(results[0]);
    });
  });
}

async function getAllQuestions(connection) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM question";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching cards:", error.message);
        return reject(error);
      }
      resolve(results);
    });
  });
}

module.exports = {
  getQuestion,
  getAllQuestions,
};
