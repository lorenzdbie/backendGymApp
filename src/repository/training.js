const {
  tables,
  getKnex
} = require('../data/index');
const {
  getLogger
} = require('../core/logging')

const logger = getLogger();

const findAll = () => {
  return getKnex()(tables.training).select().orderBy('muscleGroup', 'ASC');
}

const findCount = async () => {
  const [count] = await getKnex()(tables.training).count();
  return count['count(*)'];
}

const findById = (id) => {
  return getKnex()(tables.training).where('training_id', id).first();
};

const create = async ({
  muscleGroup
}) => {
  try {
    const [id] = await getKnex()(tables.training).insert({
      muscleGroup
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
  muscleGroup
}) => {
  try {
    await getKnex()(tables.training).update({
      muscleGroup
    }).where('training_id', id);
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
    const affectedRows = await getKnex()(tables.training).delete().where('training_id', id);
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
};