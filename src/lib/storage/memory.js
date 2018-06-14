'use strict';

const storage = {};

const database = {};

storage.getAll = () => {
  return Promise.resolve(database);
};

storage.get = id => {
  return new Promise((resolve,reject) => {
    if ( database[id] ) { resolve(database[id]); }
    else { reject(`${id} not found`); }
  });
};

storage.save = (data) => {
  return new Promise( (resolve,reject) => {
    if ( data.id ) {
      database[data.id] = data;
      resolve(database[data.id]);
    }
    else {
      reject('Invalid Data (No ID)');
    }
  });
};

storage.deleteOne = id => {
  return new Promise((resolve, reject) => {
    if (database[id]) {
      delete database[id];
      resolve(`${id} has been deleted`);
    } else { reject (`${id} not found`);}
  });
};

//storage takes in a body, looks for it instorage where body.id matches, updates all information, removing existing data.
storage.updateOne = (id, body) => {
  return new Promise((resolve, reject) => {
    if (database[id]) {
      database[id] = body;
      database[id].id = id;
      resolve(database[id]);
    } else { reject(`${id} not found`); }
  }); 
};
export default storage;