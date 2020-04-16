import http from 'http';
import express from 'express';
const port = process.env.PORT || 8080;
const server = http.createServer();
const app = express();

app.use(express.json());

server.listen(port, () => {
  console.log(`Server running ${port}`);
});
