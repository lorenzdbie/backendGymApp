const {
  getLogger,
} = require('../core/logging');
const {
  tables,
  getKnex,
} = require('../data/index');

const findAll = async () => {
  return await getKnex()(tables.user).select().orderBy('lastName', 'ASC').orderBy('firstName', 'ASC');
};

const findCount = async () => {
  const [count] = await getKnex()(tables.user).count();
  return count['count(*)'];
};

const findByAuth0id = async(auth0id) => {
  return await getKnex()(tables.user)
    .where('auth0id', auth0id)
    .first();
};

const findById = async (id) => {
  return await getKnex()(tables.user).where('id', id).first();
};

// const findByEmailAndPassword = async({
//   email,
//   passwordHash,
// }) => {
//   return await getKnex()(tables.user).where('email', email).where('password_hash',passwordHash).first();
// };

// const findByEmail = async (email) => {
//   return await getKnex()(tables.user).where('email', email).first();
// };

const create = async ({
  firstName,
  lastName,
  birthdate,
  email,
  weight,
  height,
  credits,
  auth0id,
}) => {
  try {
    const [id] = await getKnex()(tables.user).insert({
      firstName,
      lastName,
      birthdate,
      email,
      weight,
      height,
      credits,
      auth0id,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

const updateById = async (id, {
  firstName,
  lastName,
  birthdate,
  email,
  weight,
  height,
  credits,
  auth0id,
}) => {
  try {
    await getKnex()(tables.user).update({
      firstName,
      lastName,
      birthdate,
      email,
      weight,
      height,
      credits,
      auth0id,
    }).where('id', id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const affectedRows = await getKnex()(tables.user).delete().where('id', id);
    return affectedRows > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findAll,
  findCount,
  findByAuth0id,
  findById,
  // findByEmailAndPassword,
  // findByEmail,
  create,
  updateById,
  deleteById,
};