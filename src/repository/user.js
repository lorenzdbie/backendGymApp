const {
  getLogger,
} = require('../core/logging');
const {
  tables,
  getKnex,
} = require('../data/index');
// const logger = getLogger();

const findAll = () => {
  return getKnex()(tables.user).select().orderBy('lastName', 'ASC').orderBy('firstName', 'ASC');
};

const findCount = async () => {
  const [count] = await getKnex()(tables.user).count();
  return count['count(*)'];
};

const findById = (id) => {
  return getKnex()(tables.user).where('id', id).first();
};

const findByEmailAndPassword = async({
  email,
  passwordHash,
}) => {
  return await getKnex()(tables.user).where('email', email).where('password_hash',passwordHash).first();
};

const findByEmail = async (email) => {
  return await getKnex()(tables.user).where('email', email).first();
};

const create = async ({
  firstName,
  lastName,
  birthdate,
  email,
  passwordHash,
  weight,
  height,
  credits,
  roles,
}) => {
  try {
    const [id] = await getKnex()(tables.user).insert({
      firstName,
      lastName,
      birthdate,
      email,
      password_hash: passwordHash,
      weight,
      height,
      credits,
      roles: JSON.stringify(roles),
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
  passwordHash,
  weight,
  height,
  credits,
  roles,
}) => {
  try {
    await getKnex()(tables.user).update({
      firstName,
      lastName,
      birthdate,
      email,
      password_hash: passwordHash,
      weight,
      height,
      credits,
      roles: JSON.stringify(roles),
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
  findById,
  findByEmailAndPassword,
  findByEmail,
  create,
  updateById,
  deleteById,
};