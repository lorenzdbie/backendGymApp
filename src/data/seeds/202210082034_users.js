const {
  tables
} = require('..');

module.exports = {
  seed: async (knex) => {

    await knex(tables.user).delete();

    await knex(tables.user).insert([{
        user_id: 1,
        user_name: 'Galdino Noreillie',
      },
      {
        user_id: 2,
        user_name: 'Lorenz De Bie',
      },
      {
        user_id: 3,
        user_name: 'Grietje VC',
      },
      {
        user_id: 4,
        user_name: 'Geoffrey De Bie',
      }
    ]);
  },
};