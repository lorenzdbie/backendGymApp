const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments('id').primary();

      table.string('firstName', 255).notNullable();
      table.string('lastName', 255).notNullable();
      table.dateTime('birthdate').notNullable();
      table.string('email').notNullable();
      table.string('password_hash').notNullable();
      table.float('weight');
      table.float('height');
      table.integer('credits');
      table.jsonb('roles').notNullable();


      table.unique('email', 'idx_user_email_unique');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};