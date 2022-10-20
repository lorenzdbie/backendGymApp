const {
  tables
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.training).delete();

    await knex(tables.training).insert([{
        training_id: 1,
        name: 'Bench press',
        muscleGroup: 'chest',
      },
      {
        training_id: 2,
        name: 'legs',
        muscleGroup: 'legs',
      },
      {
        training_id: 3,
        name: 'Squat',
        muscleGroup: 'Glutus Maximus, hamstring, quads',
      },
      {
        training_id: 4,
        name: 'Pull-up',
        muscleGroup: 'Back',
      },
      {
        training_id: 5,
        name: 'Shoulder press',
        muscleGroup: 'Shoulders',
      },
    ]);
  },
};