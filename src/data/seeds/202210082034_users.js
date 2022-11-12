const {
  tables,
} = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {

    await knex(tables.user).delete();

    await knex(tables.user).insert([{
      id: 1,
      firstName: 'Galdino',
      lastName: 'Noreillie',
      birthdate: new Date(1996, 9, 6),
      email: 'dino@hotmail.com',
      password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      weight: 83.0,
      height: 1.87,
      credits: 10,
      roles: JSON.stringify([Role.ADMIN, Role.USER]),
    },
    {
      id: 2,
      firstName: 'Lorenz',
      lastName: 'De Bie',
      birthdate: new Date(1988, 12, 12),
      email: 'lorenz.debie@hotmail.com',
      password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      weight: 83.0,
      height: 1.87,
      credits: 5,
      roles: JSON.stringify([Role.ADMIN, Role.USER]), 
    },
    {
      id: 3,
      firstName: 'Grietje',
      lastName: 'VC',
      birthdate: new Date(1978, 4, 17),
      email: 'grietje@gmail.com',
      password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      weight: 47.0,
      height: 1.59,
      credits: 5,
      roles: JSON.stringify([Role.USER]), 
    },
    {
      id: 4,
      firstName: 'Geoffrey',
      lastName: 'De Bie',
      birthdate: new Date(1990, 10, 31),
      email: 'geoffrey66@hotmail.com',
      password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      weight: 83.0,
      height: 1.80,
      credits: 10,
      roles: JSON.stringify([Role.USER]),
    },
    ]);
  },
};