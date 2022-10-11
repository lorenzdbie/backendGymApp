const {
  tables,
  getKnex
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');
const logger = getLogger();

const SELECT_COLUMNS = [
  `${tables.appointment}.appointment_id`, 'date',
  `${tables.user}.user_id as user_id`, `${tables.user}.user_name as user_name`,
  `${tables.training}.training_id as training_id`, `${tables.training}.muscleGroup as training_muscleGroup`,
  `${tables.appointmentDetails}.appointmentDetails_id as appointmentDetails_id`, `${tables.appointmentDetails}.appointmentDetails_date as appointmentDetails_date`, `${tables.appointmentDetails}.startTime as appointment_startTime`, `${tables.appointmentDetails}.endTime as appointment_endTime`, 'intensity'
]

const formatAppointment = ({
  user_id,
  user_name,
  training_id,
  training_muscleGroup,
  appointmentDetails_id,
  appointmentDetails_date,
  appointment_startTime,
  appointment_endTime,
  ...rest
}) => ({
  ...rest,
  user: {
    id: user_id,
    name: user_name,
  },
  training: {
    id: training_id,
    muscleGroup: training_muscleGroup,
  },
  appointmentDetails: {
    id: appointmentDetails_id,
    appointmentDate: appointmentDetails_date,
    startTime: appointment_startTime,
    endTime: appointment_endTime,
  }
});

const findAll = async () => {
  const appointments = await getKnex()(tables.appointment).select(SELECT_COLUMNS)
    .join(tables.user, `${tables.appointment}.user_id`, '=', `${tables.user}.user_id`)
    .join(tables.training, `${tables.appointment}.training_id`, '=', `${tables.training}.training_id`)
    .join(tables.appointmentDetails, `${tables.appointment}.appointmentDetails_id`, '=', `${tables.appointmentDetails}.appointmentDetails_id`)
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
    .join(`${tables.appointmentDetails}`, `${tables.appointment}.appointmentDetails_id`, '=', `${tables.appointmentDetails}.appointmentDetails_id`)
    .where(`${tables.appointment}.appointment_id`, id)
    .first(SELECT_COLUMNS);

  return appointment && formatAppointment(appointment);
}

const create = async ({
  date,
  userId,
  trainingId,
  appointmentDetailsId,
  intensity
}) => {
  try {
    const [id] = await getKnex()(tables.appointment)
      .insert({
        appointment_id,
        appointment_date: date,
        user_id: userId,
        training_id: trainingId,
        appointmentDetails_id: appointmentDetailsId,
        intensity,
      });
    return id;
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
  appointmentDetailsId,
  intensity
}) => {
  try {
    await getKnex()(tables.appointment).update({
      appointment_date: date,
      user_id: userId,
      training_id: trainingId,
      appointmentDetails_id: appointmentDetailsId,
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