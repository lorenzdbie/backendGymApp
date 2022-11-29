const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.user).delete();

    await knex(tables.user).insert([{
      id: 1,
      firstName: 'Galdino',
      lastName: 'Noreillie',
      birthdate: new Date(1996, 9 -1, 6),
      email: 'dino@hotmail.com',
      weight: 83.0,
      height: 1.87,
      credits: 10,
      auth0id: '',
    },
    {
      id: 2,
      firstName: 'Lorenz',
      lastName: 'De Bie',
      birthdate: new Date(1988, 12 -1, 12),
      email: 'lorenz.debie@hotmail.com',
      weight: 83.0,
      height: 1.87,
      credits: 5,
      auth0id: 'auth0|63849dfbfba4652540f8c14c',
    },
    {
      id: 3,
      firstName: 'Grietje',
      lastName: 'VC',
      birthdate: new Date(1978, 4-1, 17),
      email: 'grietje@gmail.com',
      weight: 47.0,
      height: 1.59,
      credits: 5,
      auth0id: '',
    },
    {
      id: 4,
      firstName: 'Geoffrey',
      lastName: 'De Bie',
      birthdate: new Date(1990, 10 -1, 31),
      email: 'geoffrey66@hotmail.com',
      weight: 83.0,
      height: 1.80,
      credits: 10,
      auth0id: '',
    },
    ]);
  },
};