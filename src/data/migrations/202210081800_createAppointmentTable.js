const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.appointment, (table) => {
      table.increments('id').primary();
      table.dateTime('date').notNullable();

      table.integer('user_id').unsigned().notNullable();

      table.foreign('user_id', 'fk_appointment_user').references(`${tables.user}.id`).onDelete('CASCADE');

      table.integer('training_id').unsigned().notNullable();
      table.foreign('training_id', 'fk_appointment_training').references(`${tables.training}.id`).onDelete('CASCADE');

      table.dateTime('startTime').notNullable();
      table.dateTime('endTime').notNullable();

      table.integer('intensity');
      table.text('specialRequest');

    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.appointment);
  },
};