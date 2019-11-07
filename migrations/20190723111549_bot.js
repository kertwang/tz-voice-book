
const tableName = 'bot';

exports.up = async function(knex, Promise) {

  const exists = await knex.schema.hasTable(tableName);
  if (exists) {
    return Promise.resolve(true)
  }

  return knex.schema.createTable(tableName, (t) => {
    t.string('id').primary();
    t.string('default_version_id').notNullable();
    
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName)
};
