'use strict';

import express from 'express';
const router = express.Router();

import fs from 'fs';
import Note from '../models/notes.js';

let sendJSON = (res, data) => {

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
  res.write(JSON.stringify(error));
  res.end();

};

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  fs.readFile(__dirname + '/../../public/index.html', (err, data) => {
    let message = `HOMEPAGE <br><br> access api by going  <a href='api/v1/pizza'>here`;
    res.write(data.toString().replace('{{template}}', message));
    res.end();
  });

});

router.get('/api/v1/pizza', (req, res) => {
  Note.findAll()
    .then(data => sendJSON(res, data))
    .catch(err => serverErr(res, err));
});

router.get('/api/v1/pizza/:id', (req, res) => {

  Note.findOne(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(err => serverErr(res, err));

});

router.post('/api/v1/pizza', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request');
    res.end();
  } else {
    let newNote = new Note(req.body);

    newNote.save()
      .then(data => sendJSON(res, data))
      .catch(err => serverErr(res, err));
  }
});

router.delete('/api/v1/pizza/:id', (req, res) => {
  if (req.params.id) {
    Note.deleteOne(req.params.id)
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

router.put('/api/v1/pizza/:id', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request');
    res.end();
  } 
  else {
    Note.updateOne(req.params.id, req.body)
      .then(data => sendJSON(res, data))
      .catch(err => serverErr(res, err));
  }
});

export default router;