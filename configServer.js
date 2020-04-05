import http from 'http';

const port = process.env.PORT || 8080;
const server = http.createServer();

server.listen(port, () => {
  console.log(`Server running ${port}`);
});
