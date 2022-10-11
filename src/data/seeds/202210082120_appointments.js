const {
  tables
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.appointment).delete();

    await knex(tables.appointment).insert([{
      appointment_id: 1,
      appointment_date: new Date(2022, 10, 07, 12, 12),
        user_id: 2,
        training_id: 1,
        appointmentDetails_id: 1,
        intensity: 3,
      },
      {
        appointment_id: 2,
        appointment_date: new Date(2022, 10, 06, 20, 0),
        user_id: 3,
        training_id: 2,
        appointmentDetails_id: 2,
        intensity: 4,
      },
      {
        appointment_id: 3,
        appointment_date: new Date(2022, 10, 05, 08, 08),
        user_id: 1,
        training_id: 3,
        appointmentDetails_id: 3,
        intensity: 5,
      },
      {
        appointment_id: 4,
        appointment_date: new Date(2022, 10, 02, 12, 12),
        user_id: 4,
        training_id: 5,
        appointmentDetails_id: 4,
        intensity: 1,
      },
      {
        appointment_id: 5,
        appointment_date: new Date(2022, 10, 06, 09, 0),
        user_id: 1,
        training_id: 4,
        appointmentDetails_id: 5,
        intensity: 4,
      },
      {
        appointment_id: 6,
        appointment_date: new Date(2022, 10, 03, 08, 10),
        user_id: 3,
        training_id: 3,
        appointmentDetails_id: 6,
        intensity: 2,
      },
      {
        appointment_id: 7,
        appointment_date: new Date(2022, 10, 07, 10, 09),
        user_id: 2,
        training_id: 5,
        appointmentDetails_id: 7,
        intensity: 1,
      },
      {
        appointment_id: 8,
        appointment_date: new Date(2022, 10, 06, 10, 0),
        user_id: 4,
        training_id: 2,
        appointmentDetails_id: 8,
        intensity: 4,
      },
      {
        appointment_id: 9,
        appointment_date: new Date(2022, 10, 04, 08, 08),
        user_id: 3,
        training_id: 4,
        appointmentDetails_id: 9,
        intensity: 5,
      },
    ]);
  },
};