
const tableName = 'message'
exports.up = async function(knex, Promise) {

  const exists = await knex.schema.hasTable(tableName);
  if (exists) {
    return Promise.resolve(true)
  }

  return knex.schema.createTable(tableName, (t) => {
    t.increments().primary().notNullable();
    t.string('bot_id').notNullable();
    t.string('message_id').notNullable();
    t.string('version_id').notNullable(); //e.g. en_text, en_audio etc.
    t.integer('index').notNullable(); //A single messageId can contain more than 1 message
    t.enu('type', ['SAY', 'PLAY', 'DYNAMIC_SAY', 'DYNAMIC_PLAY']);


    //SAY
    t.string('text', 511);
    t.string('language')

    //PLAY
    t.string('url')

    //DYNAMIC_SAY, DYNAMIC_PLAY
    t.string('func');

    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));

    t.foreign('bot_id').references('id').inTable('bot')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName)
};
