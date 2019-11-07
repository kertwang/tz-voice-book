
const tableName = 'flow'
exports.up = async function(knex, Promise) {

  const exists = await knex.schema.hasTable(tableName);
  if (exists) {
    return Promise.resolve(true)
  }

  return knex.schema.createTable(tableName, (t) => {
    t.increments().primary().notNullable();
    t.string('bot_id').notNullable();
    t.string('flow_id').notNullable();
    t.enu('type', ['DEFAULT', 'GATHER']);
    t.string('next');
    t.json('digit_matches');
    t.string('error');
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));

    t.unique(['bot_id', 'flow_id'])
    t.foreign('bot_id').references('id').inTable('bot')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName)
};
