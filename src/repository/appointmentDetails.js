const {
  tables,
  getKnex
} = require('../data/index');
const {
  getLogger
} = require('../core/logging')
const logger = getLogger();

const findAll = () => {
  return getKnex()(tables.appointmentDetails).select().orderBy('appointmentDetails_date', 'ASC');
}

const findCount = async () => {
  const [count] = await getKnex()(tables.appointmentDetails).count();
  return count['count(*)'];
}

const findById = (id) => {
  return getKnex()(tables.appointmentDetails).where('appointmentDetails_id', id).first();
};

const create = async ({
  appointmentDetails_date,
  startTime,
  endTime
}) => {
  try {
    const [id] = await getKnex()(tables.appointmentDetails).insert({
      appointmentDetails_date,
      startTime,
      endTime
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
  appointmentDetails_date,
  startTime,
  endTime
}) => {
  try {
    await getKnex()(tables.appointmentDetails).update({
      appointmentDetails_date,
      startTime,
      endTime
    }).where('appointmentDetails_id', id);
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
    const affectedRows = await getKnex()(tables.appointmentDetails).delete().where('appointmentDetails_id', id);
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