const {
  tables
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.appointment).delete();

    await knex(tables.appointment).insert([{
        appointment_id: 1,
        appointment_date: new Date(2022, 11, 07),
        user_id: 2,
        training_id: 1,
        startTime: new Date(2022, 11, 07, 16, 0),
        endTime: new Date(2022, 11, 07, 18, 0),
        intensity: 3,
      },
      {
        appointment_id: 2,
        appointment_date: new Date(2022, 11, 06),
        user_id: 3,
        training_id: 2,
        startTime: new Date(2022, 11, 06, 14, 00),
        endTime: new Date(2022, 11, 07, 15, 30),
        intensity: 4,
      },
      {
        appointment_id: 3,
        appointment_date: new Date(2022, 11, 05),
        user_id: 1,
        training_id: 3,
        startTime: new Date(2022, 11, 05, 08, 00),
        endTime: new Date(2022, 11, 05, 10, 0),
        intensity: 5,
      },
      {
        appointment_id: 4,
        appointment_date: new Date(2022, 11, 02),
        user_id: 4,
        training_id: 5,
        startTime: new Date(2022, 11, 02, 11, 00),
        endTime: new Date(2022, 11, 02, 13, 30),
        intensity: 1,
      },
      {
        appointment_id: 5,
        appointment_date: new Date(2022, 11, 06),
        user_id: 1,
        training_id: 4,
        startTime: new Date(2022, 11, 06, 17, 00),
        endTime: new Date(2022, 11, 07, 19, 00),
        intensity: 4,
      },
      {
        appointment_id: 6,
        appointment_date: new Date(2022, 11, 03),
        user_id: 3,
        training_id: 3,
        startTime: new Date(2022, 11, 03, 16, 30),
        endTime: new Date(2022, 11, 03, 18, 0),
        intensity: 2,
      },
      {
        appointment_id: 7,
        appointment_date: new Date(2022, 11, 07),
        user_id: 2,
        training_id: 5,
        startTime: new Date(2022, 11, 07, 12, 00),
        endTime: new Date(2022, 11, 07, 13, 15),
        intensity: 1,
      },
      {
        appointment_id: 8,
        appointment_date: new Date(2022, 11, 06),
        user_id: 4,
        training_id: 2,
        startTime: new Date(2022, 11, 06, 10, 00),
        endTime: new Date(2022, 11, 06, 12, 00),
        intensity: 4,
      },
      {
        appointment_id: 9,
        appointment_date: new Date(2022, 11, 04),
        user_id: 3,
        training_id: 4,
        startTime: new Date(2022, 11, 04, 09, 00),
        endTime: new Date(2022, 11, 04, 10, 30),
        intensity: 5,
      },
    ]);
  },
};