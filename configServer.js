import http from 'http';
import express from 'express';
import db from './src/database/index';

const port = process.env.PORT || 5009;
const server = http.createServer();
const app = express();

app.use(express.json());
app.set(db);

server.listen(port, () => {
  console.log(`Server running ${port}`);
});
