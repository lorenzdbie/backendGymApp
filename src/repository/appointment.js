const {
  tables,
  getKnex,
} = require('../data/index');
const {
  getLogger,
} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.appointment}.id`, 'date',
  `${tables.user}.id as user_id`, `${tables.user}.firstName as firstName`,
  `${tables.user}.lastName as lastName`, `${tables.user}.email as email`,
  `${tables.training}.id as training_id`, `${tables.training}.name as training_name`,
  `${tables.training}.muscleGroup as training_muscleGroup`,
  'startTime', 'endTime', 'intensity', 'specialRequest',
];

const formatAppointment = ({
  id,
  date,
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
  id,
  date,
  user: {
    id: user_id,
    firstName: firstName,
    lastName: lastName,
    email: email,
  },
  training: {
    id: training_id,
    name: training_name,
    muscleGroup: training_muscleGroup,
  },
  startTime,
  endTime,
  intensity,
  specialRequest,
});

const findAll = async () => {
  const appointments = await getKnex()(tables.appointment).select(SELECT_COLUMNS)
    .join(tables.user, `${tables.appointment}.user_id`, '=', `${tables.user}.id`)
    .join(tables.training, `${tables.appointment}.training_id`, '=', `${tables.training}.id`)

    .orderBy('date', 'ASC');

  return appointments.map(formatAppointment);
};

const findCount = async () => {
  const [count] = await getKnex()(tables.appointment).count();
  return count['count(*)'];
};

const findCountForUser = async (id) => {
  const [count] = await getKnex()(tables.appointment)
    .join(`${tables.user}`, `${tables.appointment}.user_id`, '=', `${tables.user}.id`)
    .where(`${tables.user}.id`, id).count();
  return count['count(*)'];
};

const getAllAppointmentsForUser = async (id) => {
  const appointments = await getKnex()(tables.appointment).select(SELECT_COLUMNS)
    .join(`${tables.user}`, `${tables.appointment}.user_id`, '=', `${tables.user}.id`)
    .join(`${tables.training}`, `${tables.appointment}.training_id`, '=', `${tables.training}.id`)
    .where(`${tables.user}.id`, id);

  // console.log(appointments);
  return appointments.map(formatAppointment);
};


const findById = async (id) => {
  const appointment = await getKnex()(tables.appointment)
    .first(SELECT_COLUMNS)
    .where(`${tables.appointment}.id`, id)
    .join(`${tables.user}`, `${tables.appointment}.user_id`, '=', `${tables.user}.id`)
    .join(`${tables.training}`, `${tables.appointment}.training_id`, '=', `${tables.training}.id`);

  return appointment && formatAppointment(appointment);
};

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
        date,
        user_id: userId,
        training_id: trainingId,
        startTime,
        endTime,
        intensity,
        specialRequest,
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
      date,
      user_id: userId,
      training_id: trainingId,
      startTime,
      endTime,
      intensity,
      specialRequest,
    }).where(`${tables.appointment}.id`, id);
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
    const affectedRows = await getKnex()(tables.appointment).delete().where(`${tables.appointment}.id`, id);
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
  getAllAppointmentsForUser,
  findCountForUser,
  findById,
  create,
  updateById,
  deleteById,

};