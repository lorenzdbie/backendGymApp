const {
  tables
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.training).delete();

    await knex(tables.training).insert([{
        training_id: 1,
        muscleGroup: 'chest'
      },
      {
        training_id: 2,
        muscleGroup: 'legs'
      },
      {
        training_id: 3,
        muscleGroup: 'back'
      },
      {
        training_id: 4,
        muscleGroup: 'arms'
      },
      {
        training_id: 5,
        muscleGroup: 'shoulders'
      },
    ]);
  },
};