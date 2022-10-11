const {
  tables
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments('user_id').primary();

      table.string('user_name', 255).notNullable();

      table.unique('user_name', 'idx_user_name_unique');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  }
}