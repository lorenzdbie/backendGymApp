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
  `${tables.user}.user_id as user_id`, `${tables.user}.firstName as firstName`, `${tables.user}.lastName as lastName`, `${tables.user}.email as email`,
  `${tables.training}.training_id as training_id`, `${tables.training}.name as training_name`, `${tables.training}.muscleGroup as training_muscleGroup`,
  `${tables.appointment}.startTime as startTime`, `${tables.appointment}.endTime as endTime`, `${tables.appointment}.intensity as intensity`, `${tables.appointment}.specialRequest as specialRequest`
]

const formatAppointment = ({
  appointment_id,
  appointment_date,
  user_id,
  firstName,
  lastName,
  email,
  training_id,
  training_name,
  training_muscleGroup,
  startTime,
  endTime,
  intensity,
  specialRequest,
}) => ({
  id: appointment_id,
  date: appointment_date,
  user: {
    id: user_id,
    firstNamw: firstName,
    lastName: lastName,
    email: email,
  },
  training: {
    id: training_id,
    name: training_name,
    muscleGroup: training_muscleGroup,
  },
  startTime: startTime,
  endTime: endTime,
  intensity: intensity,
  specialRequest: specialRequest
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
  intensity,
  specialRequest,
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
        specialRequest: specialRequest,
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
  intensity,
  specialRequest,
}) => {
  try {
    await getKnex()(tables.appointment).update({
      appointment_date: date,
      user_id: userId,
      training_id: trainingId,
      startTime: startTime,
      endTime: endTime,
      intensity,
      specialRequest: specialRequest,
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