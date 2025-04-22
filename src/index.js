const back = require("./api/server");

app = back.app;

function startServer() {
  const PORT = 3000;
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  back.end();
  server.close(() => {
    console.log("HTTP server closed");
  });
  process.exit(0);
});

startServer();
