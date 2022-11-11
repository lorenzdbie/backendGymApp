const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.training).delete();

    await knex(tables.training).insert([{
      id: 1,
      name: 'Bench press',
      muscleGroup: 'chest',
    },
    {
      id: 2,
      name: 'legs',
      muscleGroup: 'legs',
    },
    {
      id: 3,
      name: 'Squat',
      muscleGroup: 'Glutus Maximus, hamstring, quads',
    },
    {
      id: 4,
      name: 'Pull-up',
      muscleGroup: 'Back',
    },
    {
      id: 5,
      name: 'Shoulder press',
      muscleGroup: 'Shoulders',
    },
    ]);
  },
};