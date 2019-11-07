


exports.up = async function(knex, Promise) {

  const exists = await knex.schema.hasTable('account');
  if (exists) {
    return Promise.resolve(true)
  }

  return knex.schema.createTable('account', (table) => {
    table.increments('id').primary().notNullable()
    table.string('username', 50).notNullable().unique();
    table.string('access_token').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('account')
};
