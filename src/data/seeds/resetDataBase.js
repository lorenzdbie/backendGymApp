const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.appointment).delete();
    await knex(tables.training).delete();
    await knex(tables.user).delete();
  },
};