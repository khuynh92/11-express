'use strict';

const router = require('../../../src/lib/router');

describe('router module', () => {


  it('should handle routes of multiple types', ()=> {
    router.get('/', () => true);
    router.put('/', () => true);
    router.post('/', () => true);
    router.patch('/', () => true);
    router.delete('/', () => true);
    expect( router.routes.GET['/']).toBeDefined();
    expect( router.routes.PUT['/']).toBeDefined();
    expect( router.routes.POST['/']).toBeDefined();
    expect( router.routes.PATCH['/']).toBeDefined();
    expect( router.routes.DELETE['/']).toBeDefined();
  });

  it('can create multiple routes of the same type', () => {
    router.routes.GET = {};
    router.get('/foo', () => true);
    router.get('/bar', () => true);
    router.get('/baz', () => true);
    expect( Object.keys(router.routes.GET).length ).toEqual(3);
  });
  
  it('can route get requests', () => {
  
    router.get('/foobar', () => 'get/foobar');
    let req = { method: 'GET', url: 'http://localhost/foobar?testing' };
    let res = {};
    return router.route(req,res)
      .then( result => {
        console.log(result);
        expect(result).toEqual('get/foobar');
      });
  });

});