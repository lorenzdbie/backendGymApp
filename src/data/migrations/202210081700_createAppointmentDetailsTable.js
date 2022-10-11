const {
  tables
} = require('..')

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.appointmentDetails, (table) => {
      table.increments('appointmentDetails_id').primary();

      table.dateTime('appointmentDetails_date', {
        precsion: 6
      }).notNullable();
      table.time('startTime', {
        precsion: 4
      }).notNullable();
      table.time('endTime', {
        precsion: 4
      }).notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.appointmentDetails);
  }
}