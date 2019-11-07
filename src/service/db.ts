import knex from 'knex';

const config = require('../../config/knexfile.js')
const db = knex(config);

export default db
