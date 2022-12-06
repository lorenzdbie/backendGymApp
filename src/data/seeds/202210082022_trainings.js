const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.training).delete();

    await knex(tables.training).insert([{
      id: 1,
      name: 'Strength: Chest',
      muscleGroup: 'all chest muscles',
    },
    {
      id: 2,
      name: 'Strength: Legs',
      muscleGroup: 'all leg muscles',
    },
    {
      id: 3,
      name: 'Strength: Back',
      muscleGroup: 'all back muscles',
    },
    {
      id: 4,
      name: 'Strength: Shoulders',
      muscleGroup: 'all shoulder muscles',
    },
    {
      id: 5,
      name: 'Strength: Arms',
      muscleGroup: 'all arm muscles',
    },
    {
      id: 6,
      name: 'Strength: Core',
      muscleGroup: 'all core muscles',
    },
    {
      id: 7,
      name: 'Calisthenics',
      muscleGroup: 'all muscles',
    },
    {
      id: 8,
      name: 'HITT',
      muscleGroup: 'high intensity interval training',
    }, 
    {
      id: 9,
      name: 'low intensity cardio',
      muscleGroup: 'various',
    }, 
    {
      id: 10,
      name: 'medium intensity cardio',
      muscleGroup: 'various',
    }, 
    {
      id: 11,
      name: 'high intensity cardio',
      muscleGroup: 'various',
    },
  

    ]);
  },
};