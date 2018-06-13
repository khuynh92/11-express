
'use strict';

const superagent = require('superagent');
const app = require('../../../src/app');

describe('app module', () => {

  beforeAll( () => {
    app.start(3002);
  });

  afterAll( () => {
    app.stop();
  });

  it('should return 200 for homepage', () => {
    return superagent.get('http://localhost:3002')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('<!DOCTYPE '));
      });
  });

  it('should return 200 for homepage', () => {
    return superagent.get('http://localhost:3002')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('<!DOCTYPE '));
      });
  });

  it('should return an empty object for get at api/v1/pizza', () => {
    return superagent.get('http://localhost:3002/api/v1/pizza')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(`{}`);
      });
  });

  it('should return an object for get at api/v1/pizza/id=pineapples', () => {

    let obj = {pineapples:'do not belong on pizza', id:'pineapples'};
    return superagent.post('http://localhost:3002/api/v1/pizza')
      .send(obj)
      .then(() => {
        return superagent.get('http://localhost:3002/api/v1/pizza?id=pineapples')
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toEqual(expect.stringContaining('{"pineapples":"do not belong on pizza","id"'));
          });
      });

  });

  it('should return a 400 error when an empty id is given', () => {
    return superagent.get('http://localhost:3002/api/v1/pizza?id=')
      .catch(err => {
        expect(err.status).toBe(404);
        expect(err.response.text).toEqual(`{ERROR: 'Bad Request'}`);
      });
  });


  it('if given bad id, should return not found', () => {
    return superagent.get('http://localhost:3002/api/v1/pizza?id=missing')
      // .then(response => false);
      .catch(err => {
        expect(err.status).toBe(404);
        expect(err.response.text).toBe('{"error":"missing not found"}');
      });
  });

  it('handles a good post request', () => {
    let obj = {pineapples:'do not belong on pizza'};
    return superagent.post('http://localhost:3002/api/v1/pizza')
      .send(obj)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('{"pineapples":"do not belong on pizza","id"'));
      })
      .catch(console.err);
  });

  it('handles a post request with no body as a 400 error', () => {
    return superagent.post('http://localhost:3002/api/v1/pizza')
  
      // .then(response => false)
      .catch(err => {
        expect(err.status).toBe(400);
        expect(err.response.text).toEqual('bad request');
      });
  });

  it('should handle good delete request', () => {
    let obj = {pineapples:'do not belong on pizza', id:'pineapples'};
    return superagent.post('http://localhost:3002/api/v1/pizza')
      .send(obj)
      .then(() => {
        return superagent.delete('http://localhost:3002/api/v1/pizza?id=pineapples')
          .then(response => {
            expect(response.statusCode).toBe(204);
          });
      });  
  });
  
  it('should handle a bad delete request', () => {
    return superagent.delete('http://localhost:3002/api/v1/pizza?keep=calzones')
      // .then(response => false)
      .catch(err => {
        expect(err.response.text).toEqual(`Not found`);
      });
  });
});