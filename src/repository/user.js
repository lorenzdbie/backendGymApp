const {
  getLogger
} = require('../core/logging');
const {
  tables,
  getKnex
} = require('../data/index');
const logger = getLogger();

const findAll = () => {
  return getKnex()(tables.user).select().orderBy('user_name', 'ASC');
};

const findCount = async () => {
  const [count] = await getKnex()(tables.user).count();
  return count['count(*)'];
};

const findById = (id) => {
  return getKnex()(tables.user).where('user_id', id).first();
};

const create = async ({
  user_name
}) => {
  try {
    const [id] = await getKnex()(tables.user).insert({
      user_name
    });
    return id;
  } catch (error) {
    logger.error('Error in create', {
      error
    });
    throw error
  }
};

const updateById = async (id, {
  user_name
}) => {
  try {
    await getKnex()(tables.user).update({
      user_name
    }).where('user_id', id);
    return id;
  } catch (error) {
    logger.error('Error in updateById', {
      error
    });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const affectedRows = await getKnex()(tables.user).delete().where('user_id', id);
    return affectedRows > 0;
  } catch (error) {
    logger.error('Error in deleteById', {
      error
    });
    throw error;
  }
}

module.exports = {
  findAll,
  findCount,
  findById,
  create,
  updateById,
  deleteById,
}