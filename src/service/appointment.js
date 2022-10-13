let {
  APPOINTMENTS,
  TRAININGS
} = require('../data/mock_data');
const {
  getLogger
} = require('../core/logging');
const logger = getLogger();

const getAll = () => {
  return {
    data: APPOINTMENTS,
    count: APPOINTMENTS.length
  };
}

const getById = (id) => {
  console.log(id);
  const appointment = APPOINTMENTS.filter(e => e.id === parseInt(id.replace(':', '')));
  console.log(appointment)
  return appointment;

}

const create = ({
  user,
  trainingId,
  appointmentDetails,
  date
}) => {
  let existingTraining;
  if (trainingId) {
    existingTraining = TRAININGS.filter(training => training.id === trainingId);

    if (!existingTraining) {
      logger.error(`There is no training with id ${id}`, {
        id
      });
    }
  }
  if (typeof user === 'string') {
    user = {
      id: Math.floor(Math.random() * 100000),
      name: user
    };
  }
  const maxId = Math.max(...APPOINTMENTS.map(i => i.id));
  const newAppointment = {
    id: maxId + 1,
    date: date.toISOString(),
    user,
    training: existingTraining,
    appointmentDetails,
  };
  APPOINTMENTS = [...APPOINTMENTS, newAppointment];
  return newAppointment;
}

const updateById = (id, {
  user,
  trainingId,
  appointmentDetails,
  date
}) => {
  throw new Error('not implemented yet');
}

const deleteById = (id) => {
  APPOINTMENTS = APPOINTMENT
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}