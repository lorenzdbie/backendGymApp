const appointmentRepository = require('../repository/appointment')
const userService = require('./user')

const {
  getLogger
} = require('../core/logging');


const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};


const getAll = async () => {
  debugLog('Fetching all appointments');
  const appointments = await appointmentRepository.findAll();
  const totalCount = await appointmentRepository.findCount();
  return {
    appointments,
    count: totalCount,
  };
}

const getById = async (id) => {
  debugLog(`Fetching appointment with id ${id}`);
  const appointment = await appointmentRepository.findById(id);

  if (!appointment) {
    throw new Error(`Appointment with id ${id} not found`);
  }

  return appointment;
}

const create = async ({
  date,
  trainingId,
  startTime,
  endTime,
  intensity,
  userId,
  specialRequest,
}) => {

  debugLog('Creating a new appointment', {
    date,
    trainingId,
    startTime,
    endTime,
    intensity,
    userId,
    specialRequest
  });



  const id = await appointmentRepository.create({
    date,
    userId,
    trainingId,
    startTime,
    endTime,
    intensity,
    specialRequest,
  });
  return getById(id);
}

const updateById = async (id, {
  date,
  trainingId,
  startTime,
  endTime,
  intensity,
  userId,
  specialRequest,
}) => {

  debugLog(`Updating appointment with id ${id}`, {
    date,
    trainingId,
    startTime,
    endTime,
    intensity,
    userId,
    specialRequest
  });

  await appointmentRepository.updateById(id, {
    date,
    userId,
    trainingId,
    startTime,
    endTime,
    intensity,
    specialRequest,
  });
  return getById(id);
}

const deleteById = async (id) => {

  debugLog(`Deleting appointment with id ${id}`);
  await appointmentRepository.deleteById(id);
}

// const getById = (id) => {
//   console.log(id);
//   const appointment = APPOINTMENTS.filter(e => e.id === parseInt(id.replace(':', '')));
//   console.log(appointment)
//   return appointment;

// }

// const create = ({
//   user,
//   trainingId,
//   appointmentDetails,
//   date
// }) => {
//   let existingTraining;
//   if (trainingId) {
//     existingTraining = TRAININGS.filter(training => training.id === trainingId);

//     if (!existingTraining) {
//       logger.error(`There is no training with id ${id}`, {
//         id
//       });
//     }
//   }
//   if (typeof user === 'string') {
//     user = {
//       id: Math.floor(Math.random() * 100000),
//       name: user
//     };
//   }
//   const maxId = Math.max(...APPOINTMENTS.map(i => i.id));
//   const newAppointment = {
//     id: maxId + 1,
//     date: date.toISOString(),
//     user,
//     training: existingTraining,
//     appointmentDetails,
//   };
//   APPOINTMENTS = [...APPOINTMENTS, newAppointment];
//   return newAppointment;
// }

// const updateById = (id, {
//   user,
//   trainingId,
//   appointmentDetails,
//   date
// }) => {
//   throw new Error('not implemented yet');
// }

// const deleteById = (id) => {
//   APPOINTMENTS = APPOINTMENT
// }

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}