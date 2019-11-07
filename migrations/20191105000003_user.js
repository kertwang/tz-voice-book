
const tableName = 'vb_user'
exports.up = async function(knex, Promise) {

  const exists = await knex.schema.hasTable(tableName);
  if (exists) {
    return Promise.resolve(true)
  }

  return knex.schema.createTable(tableName, (t) => {
    t.increments().primary().notNullable();
    t.string('mobile').notNullable();
    t.string('name').notNullable();
    t.string('version_id').notNullable()

    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));

    t.unique('mobile')

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName)
};
