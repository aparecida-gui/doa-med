import supertest from 'supertest';
import server from '../../configServer';
const request = supertest(server);

describe('Medicine', () => {
  it('return status code 200 route seach medicine.', async (done) => {
    const resMedicine = await request.get('/medicine/dorflex');

    expect(resMedicine.status).toBe(200);
    done();
  }),
    it('return status code 404 seach medicine.', async (done) => {
      const resMedicine = await request.get('/medicine');

      expect(resMedicine.status).toBe(404);
      done();
    }),
    it('return message.', async (done) => {
      const resMedicine = await request.get('/medicine/teste');

      expect(resMedicine.status).toBe(200);
      done();
    });
});
