const {
  tables,
  getKnex,
} = require('../data/index');
const {
  getLogger,
} = require('../core/logging');


const findAll = () => {
  return getKnex()(tables.training).select().orderBy('name', 'ASC');
};

const findCount = async () => {
  const [count] = await getKnex()(tables.training).count();
  return count['count(*)'];
};

const findById = (id) => {
  return getKnex()(tables.training).where('id', id).first();
};

const create = async ({
  name,
  muscleGroup,
}) => {
  try {
    const [id] = await getKnex()(tables.training).insert({
      name,
      muscleGroup,
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
  name,
  muscleGroup,
}) => {
  try {
    await getKnex()(tables.training).update({
      name,
      muscleGroup,
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
    const affectedRows = await getKnex()(tables.training).delete().where('id', id);
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
  create,
  updateById,
  deleteById,
};