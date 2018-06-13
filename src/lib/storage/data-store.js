'use strict';

const memoryStorage = require('./memory');
const fileStorage = require('./filesystem');

let dataStorageModule = {};

switch (process.env.STORAGE) {
case 'filesystem':
  dataStorageModule = fileStorage;
  break;
default:
  dataStorageModule = memoryStorage;
}

module.exports = dataStorageModule;