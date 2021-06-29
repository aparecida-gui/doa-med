import cors from 'cors';
import express from 'express';
import router from './src/back-end/routers.js';
import db from './src/database/index.js';
import path from 'path';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

db.sync()
  .then(() => {
    server();
  })
  .catch((err) => {
    console.log('>>>> Err database : ', err);
  });

app.use(express.static(path.resolve('./src/front-end/build')));

// --> Add this
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join('front-end/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join('front-end/build', 'index.html'));
  });
}

app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: 'Não foi possível encontrar a página solicitada...' });
  next();
});

const server = () => {
  app.listen(port);
  console.log(`>>>>> server run port: ${port}`);
};

export default app;
