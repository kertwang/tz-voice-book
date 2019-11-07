

exports.up = async function(knex, Promise) {

  const exists = await knex.schema.hasTable('block');
  if (exists) {
    return Promise.resolve(true)
  }

  return knex.schema.createTable('block', (t) => {
    t.increments().primary().notNullable();
    t.string('bot_id').notNullable();
    t.string('block_id').notNullable();
    t.enu('type', ['DEFAULT', 'PLAYBACK', 'RECORD', 'END']);
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    
    t.unique(['bot_id', 'block_id'])
    t.foreign('bot_id').references('id').inTable('bot')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('block')
};
