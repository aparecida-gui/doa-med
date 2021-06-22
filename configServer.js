import cors from 'cors';
import express from 'express';
import router from './src/back-end/routers.js';
import bodyParser from 'body-parser';
import db from './src/database/index.js';
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Quando for fazer deploy comenta está linha das rotas.
app.use('/', router);

// app.use(
//   '/files/',
//   express.static(path.resolve(__dirname, '.', 'tmp', 'uploads'))
// );

const server = () => {
  console.log('>>>>>> process.env.PORT: ', process.env.PORT);
  app.listen(process.env.PORT || 5000);
  console.log('>>>>> server run');
};

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

export default app;
