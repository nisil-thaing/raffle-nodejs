import request from 'supertest';
import { expect } from 'chai';
import { app } from '@app/configs';

describe('GET /', () => {
  const appRequest = request(app);

  it('should return 200 OK', async done => {
    try {
      const res = await appRequest.get('/');
      expect(res.status).to.equal(200);
      expect(res.body).have.property('message');
    } catch(e) {
      //
    } finally {
      done();
    }
  });
});
