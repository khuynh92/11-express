'use strict';

const storage = require('../lib/storage/data-store');
const uuid = require('uuid/v1');

class Note {

  constructor(config) {
    // this.createdOn = new Date();
    // this.title = config && config.title || '';
    // this.content = config && config.content || '';
    // this.Object.values(this)[0] = Object.values(config)[0];

    for(let i = 0; i < Object.keys(config).length; i++) {
      this[Object.keys(config)[i]] = Object.values(config)[i];
    }
 
    this.id = config && config.id || uuid();

  }

  save() {
    return storage.save(this);
  }

  static findAll() {
    return storage.getAll();
  }

  static findOne(id) {
    return storage.get(id);
  }


  static deleteOne(id) {
    return storage.deleteOne(id);
  }
}

module.exports = Note;