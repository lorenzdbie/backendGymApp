const {
  tables
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.training, (table) => {
      table.increments('training_id').primary();

      table.string('muscleGroup', 255).notNullable();

      table.unique('muscleGroup', 'idx_muscleGroup_unique');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.training);
  }
}