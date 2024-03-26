const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const dbConfig = new Config('local', true, false, '/');
const db = new JsonDB(dbConfig);

module.exports = db;
