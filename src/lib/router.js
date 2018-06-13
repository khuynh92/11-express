'use strict';

const parser = require('./parser');

let router = {};

router.routes = {};

const methods = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'];


methods.forEach(method => {
  router.routes[method] = {};

  router[method.toLowerCase()] = function(path, callback) {
    router.routes[method][path] = callback;
  };

});

router.route = (req, res) => {
  return parser (req)
    .then(req => {
      let handler = router.routes[req.method][req.url.pathname];

      if(handler) {
        return handler(req, res);
      }
    })
    .catch(err => {
      console.error('NOT_FOUND', req.url.pathname);
      console.log(err);
      res.statusCode = 400;
      res.statusMessage = 'Not Found';
      res.write(`bad request`);
      res.end();
    });
};

module.exports = router;
