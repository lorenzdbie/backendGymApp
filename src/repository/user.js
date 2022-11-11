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

const findByEmailAndPassword = (({
  email,
  password,
}) => {
  return getKnex()(tables.user).where('email', email).where('password', password).first();
});

const create = async ({
  firstName,
  lastName,
  birthdate,
  email,
  password,
  weight,
  height,
  credits,
  role,
}) => {
  try {
    const [id] = await getKnex()(tables.user).insert({
      firstName,
      lastName,
      birthdate,
      email,
      password,
      weight,
      height,
      credits,
      role,
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
  password,
  weight,
  height,
  credits,
  role,
}) => {
  try {
    await getKnex()(tables.user).update({
      firstName,
      lastName,
      birthdate,
      email,
      password,
      weight,
      height,
      credits,
      role,
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
  create,
  updateById,
  deleteById,
};