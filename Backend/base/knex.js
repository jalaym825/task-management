const Knex = require('knex')
const { databaseUrl } = require('../config.json')

const Database = Knex({ client: 'pg', connection: databaseUrl });

module.exports = Database;