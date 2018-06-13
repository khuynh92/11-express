'use strict';

const router = require('../lib/router');
const fs = require('fs');
const Note = require('../models/notes');


let sendJSON = (res,data) => {

  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
  
};

let serverErr = (res, err) => {
  let error = { error: err };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();

};

router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  fs.readFile(__dirname + '/../../public/index.html', (err, data) => {
    let message = `HOMEPAGE <br><br> access api by going  <a href='api/v1/pizza'>here`;
    res.write(data.toString().replace('{{template}}', message));
    res.end();
  });

});

router.get('/api/v1/pizza', (req, res) => {
  if(req.url.query.id === '') {
    res.statusCode = 404;
    res.statusMessage = 'bad request';
    res.write(`{ERROR: 'Bad Request'}`);
    res.end();
  } else if(req.url.query.id) {
    Note.findOne(req.url.query.id)
      .then(data => sendJSON(res, data))
      .catch(err => serverErr(res,err));

  }else {
    Note.findAll()
      .then(data => sendJSON(res, data))
      .catch(err => serverErr(res, err));
  }
});

router.post('/api/v1/pizza', (req,res) => {

  let newNote = new Note(req.body);

  newNote.save()
    .then(data => sendJSON(res,data))
    .catch(err => serverErr(res, err));

});

router.delete('/api/v1/pizza', (req, res) => {
  if(req.url.query.id) {
    Note.deleteOne(req.url.query.id)
      .then(() => {
        res.statusCode = 204;
        res.statusMessage = 'OK';
        res.end();
      })
      .catch(err => serverErr(res, err));
  } else {
    res.statusCode = 404;
    res.statusMessage = 'OK';
    res.write(`Not found`);
    res.end();
  }
});

