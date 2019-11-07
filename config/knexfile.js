const path = require('path');
const { Model, knexSnakeCaseMappers } = require('objection');

const BASE_PATH = path.join(__dirname, '../');

const config = {
  client: 'postgresql',
  //TODO: is there a way to load this from the env?
  connection: `${process.env.DATABASE_URL}${process.env.DATABASE_URL_SSL || ''}`, 
  migrations: {
    directory: path.join(BASE_PATH, 'migrations')
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds')
  },
  ...knexSnakeCaseMappers(),
}

module.exports = config