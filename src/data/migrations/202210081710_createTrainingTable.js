const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.training, (table) => {
      table.increments('id').primary();

      table.string('name', 255).notNullable();

      table.string('muscleGroup', 255).notNullable();

      table.unique('name', 'idx_name_unique');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.training);
  },
};