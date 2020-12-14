import 'regenerator-runtime/runtime.js';
import supertest from 'supertest';
import serverTest from './serverTest';

describe('Test Login status code 200', () => {
  test('return status 200', (done) => {
    supertest(serverTest)
      .post('/')
      .send({
        email: 'mariaDaSilva@email.com',
        password: '111111',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        expect(res.status).toEqual(200);
        done();
      });
  });

  test('return status code 401', (done) => {
    supertest(serverTest)
      .post('/')
      .send({
        email: 'mariaDaSilva12@email.com',
        password: '111111',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        expect(res.body).toEqual({ message: 'Usuário não cadastrado.' });
        expect(res.status).toEqual(401);
        done();
      });
  });
});
