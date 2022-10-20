const {
  tables
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.appointment, (table) => {
      table.increments('appointment_id').primary();
      table.dateTime('appointment_date').notNullable();

      table.integer('user_id').unsigned().notNullable();

      table.foreign('user_id', 'fk_appointment_user').references(`${tables.user}.user_id`).onDelete('CASCADE');

      table.integer('training_id').unsigned().notNullable();
      table.foreign('training_id', 'fk_appointment_training').references(`${tables.training}.training_id`).onDelete('CASCADE');

      // table.integer('appointmentDetails_id').unsigned().notNullable();
      // table.foreign('appointmentDetails_id', 'fk_appointment_appointmentDetails').references(`${tables.appointmentDetails}.appointmentDetails_id`).onDelete('CASCADE');

      table.dateTime('startTime').notNullable();
      table.dateTime('endTime').notNullable();

      table.integer('intensity');

    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.appointment);
  }
}