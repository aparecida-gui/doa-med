import cors from 'cors';
import express from 'express';
import router from './src/back-end/routers';
import bodyParser from 'body-parser';
import db from './src/database';
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use(
  '/files/',
  express.static(path.resolve(__dirname, '.', 'tmp', 'uploads'))
);

app.use('/', router);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: 'Não foi possível encontrar a página solicitada.' });
  next();
});

db.sync()
  .then(() => {
    server();
  })
  .catch((err) => {
    console.log('>>>> Err database : ', err);
  });

if (process.env.Node_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, './src/front-end/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './src/front-end/build/index.html'));
  });
}

const server = () => {
  app.listen(port);
  console.log(`>>>>> server run port: ${port}`);
};

export default app;
