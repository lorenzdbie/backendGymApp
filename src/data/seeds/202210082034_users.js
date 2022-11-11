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
      birthdate: new Date(1996, 9, 6),
      email: 'dino@hotmail.com',
      password: 'a123b',
      weight: 83.0,
      height: 1.87,
      credits: 10,
      role: 'admin',
    },
    {
      id: 2,
      firstName: 'Lorenz',
      lastName: 'De Bie',
      birthdate: new Date(1988, 12, 12),
      email: 'lorenz.debie@hotmail.com',
      password: '12345',
      weight: 83.0,
      height: 1.87,
      credits: 5,
      role: 'user',
    },
    {
      id: 3,
      firstName: 'Grietje',
      lastName: 'VC',
      birthdate: new Date(1978, 4, 17),
      email: 'grietje@gmail.com',
      password: '%ByI&1',
      weight: 47.0,
      height: 1.59,
      credits: 5,
      role: 'user',
    },
    {
      id: 4,
      firstName: 'Geoffrey',
      lastName: 'De Bie',
      birthdate: new Date(1990, 10, 31),
      email: 'geoffrey66@hotmail.com',
      password: 'a123b',
      weight: 83.0,
      height: 1.80,
      credits: 10,
      role: 'admin',
    },
    ]);
  },
};