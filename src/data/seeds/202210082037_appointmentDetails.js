const {
  tables
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.appointmentDetails).delete();

    await knex(tables.appointmentDetails).insert([{
      appointmentDetails_id: 1,
      appointmentDetails_date: new Date(2022, 10, 06, 16, 0),
        startTime: new Date(2022, 10, 06, 16, 0),
        endTime: new Date(2022, 10, 06, 18, 0),
      },
      {
        appointmentDetails_id: 2,
        appointmentDetails_date: new Date(2022, 10, 08, 08, 0),
        startTime: new Date(2022, 10, 08, 08, 0),
        endTime: new Date(2022, 10, 08, 10, 0),
      },
      {
        appointmentDetails_id: 3,
        appointmentDetails_date: new Date(2022, 10, 12, 10, 0),
        startTime: new Date(2022, 10, 12, 10, 0),
        endTime: new Date(2022, 10, 12, 14, 0),
      },
      {
        appointmentDetails_id: 4,
        appointmentDetails_date: new Date(2022, 10, 17, 16, 0),
        startTime: new Date(2022, 10, 17, 16, 0),
        endTime: new Date(2022, 10, 17, 18, 0),
      },
      {
        appointmentDetails_id: 5,
        appointmentDetails_date: new Date(2022, 10, 09, 08, 0),
        startTime: new Date(2022, 10, 09, 08, 0),
        endTime: new Date(2022, 10, 09, 10, 0),
      },
      {
        appointmentDetails_id: 6,
        appointmentDetails_date: new Date(2022, 10, 14, 10, 0),
        startTime: new Date(2022, 10, 14, 10, 0),
        endTime: new Date(2022, 10, 14, 14, 0),
      },
      {
        appointmentDetails_id: 7,
        appointmentDetails_date: new Date(2022, 10, 11, 16, 0),
        startTime: new Date(2022, 10, 11, 16, 0),
        endTime: new Date(2022, 10, 11, 18, 0),
      },
      {
        appointmentDetails_id: 8,
        appointmentDetails_date: new Date(2022, 10, 21, 08, 0),
        startTime: new Date(2022, 10, 21, 08, 0),
        endTime: new Date(2022, 10, 21, 10, 0),
      },
      {
        appointmentDetails_id: 9,
        appointmentDetails_date: new Date(2022, 11, 02, 10, 0),
        startTime: new Date(2022, 11, 02, 10, 0),
        endTime: new Date(2022, 11, 02, 14, 0),
      },
    ]);
  },
};