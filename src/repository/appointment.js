const {
  tables,
  getKnex
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');
const logger = getLogger();

const SELECT_COLUMNS = [
  `${tables.appointment}.appointment_id`, `${tables.appointment}.appointment_date as appointment_date`,
  `${tables.user}.user_id as user_id`, `${tables.user}.user_name as user_name`,
  `${tables.training}.training_id as training_id`, `${tables.training}.name as training_name`, `${tables.training}.muscleGroup as training_muscleGroup`,
  `${tables.appointment}.startTime as startTime`, `${tables.appointment}.endTime as endTime`, `${tables.appointment}.intensity as intensity`
]

const formatAppointment = ({
  appointment_id,
  appointment_date,
  user_id,
  user_name,
  training_id,
  training_name,
  training_muscleGroup,
  startTime,
  endTime,
  intensity
}) => ({
  id: appointment_id,
  date: appointment_date,
  user: {
    id: user_id,
    name: user_name,
  },
  training: {
    id: training_id,
    name: training_name,
    muscleGroup: training_muscleGroup,
  },
  startTime: startTime,
  endTime: endTime,
  intensity: intensity
});

const findAll = async () => {
  const appointments = await getKnex()(tables.appointment).select(SELECT_COLUMNS)
    .join(tables.user, `${tables.appointment}.user_id`, '=', `${tables.user}.user_id`)
    .join(tables.training, `${tables.appointment}.training_id`, '=', `${tables.training}.training_id`)

    .orderBy('appointment_date', 'ASC');

  return appointments.map(formatAppointment);
}

const findCount = async () => {
  const [count] = await getKnex()(tables.appointment).count();
  return count['count(*)'];
}



const findById = async (id) => {
  const appointment = await getKnex()(tables.appointment)
    .join(`${tables.user}`, `${tables.appointment}.user_id`, '=', `${tables.user}.user_id`)
    .join(`${tables.training}`, `${tables.appointment}.training_id`, '=', `${tables.training}.training_id`)
    .where(`${tables.appointment}.appointment_id`, id)
    .first(SELECT_COLUMNS);

  return appointment && formatAppointment(appointment);
}

const create = async ({
  date,
  userId,
  trainingId,
  startTime,
  endTime,
  intensity
}) => {
  try {
    const [id] = await getKnex()(tables.appointment)
      .insert({
        appointment_id,
        appointment_date: date,
        user_id: userId,
        training_id: trainingId,
        startTime: startTime,
        endTime: endTime,
        intensity: intensity,
      });
    return await findById(id);
  } catch (error) {
    logger.error('Error in create', {
      error
    });
    throw error;
  }
}

const updateById = async (id, {
  date,
  userId,
  trainingId,
  startTime,
  endTime,
  intensity
}) => {
  try {
    await getKnex()(tables.appointment).update({
      appointment_date: date,
      user_id: userId,
      training_id: trainingId,
      startTime: startTime,
      endTime: endTime,
      intensity,
    }).where(`${tables.appointment}.appointment_id`, id);
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
    const affectedRows = await getKnex()(tables.appointment).delete().where(`${tables.appointment}.appointment_id`, id);
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