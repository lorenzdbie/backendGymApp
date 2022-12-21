const appointmentRepository = require('../repository/appointment');
const {
  getLogger,
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
};

const getAllAppointmentforUser = async (id) => {
  debugLog(`Fetching all appointments for user with id ${id}`);
  const appointments = await appointmentRepository.getAllAppointmentsForUser(id);
  const totalCount = await appointmentRepository.findCountForUser(id);
  // console.log(appointments, totalCount);
  return {
    appointments,
    count: totalCount,
  };
};

const getById = async (id) => {
  debugLog(`Fetching appointment with id ${id}`);
  const appointment = await appointmentRepository.findById(id);

  if (!appointment) {
    throw new Error(`Appointment with id ${id} not found`);
  }

  return appointment;
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

  debugLog('Creating a new appointment', {
    date,
    userId,
    trainingId,
    startTime,
    endTime,
    intensity,
    specialRequest,
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

  debugLog(`Updating appointment with id ${id}`, {
    date,
    userId,
    trainingId,
    startTime,
    endTime,
    intensity,
    specialRequest,
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
};

const deleteById = async (id) => {

  debugLog(`Deleting appointment with id ${id}`);
  await appointmentRepository.deleteById(id);
};


module.exports = {
  getAll,
  getById,
  getAllAppointmentforUser,
  create,
  updateById,
  deleteById,
};