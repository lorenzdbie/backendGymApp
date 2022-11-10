const trainingRepository = require('../repository/training');

const {
  getLogger
} = require('../core/logging');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all trainings');
  const trainings = await trainingRepository.findAll();
  const count = await trainingRepository.findCount();
  return {
    trainings,
    count,
  };
}

const getByName = async (name) => {
  debugLog(`Fetching training with name ${name}`);
  return await trainingRepository.findByName(name);
}

const getById = async (id) => {
  debugLog(`Fetching training with id ${id}`);
  const training = await trainingRepository.findById(id);
  return training;
}

const create = async ({
  name,
  muscleGroup
}) => {
  const newTraining = {
    name,
    muscleGroup
  };
  debugLog('Creating a new training', newTraining)
  const id = await trainingRepository.create(newTraining);
  return getById(id);
}

const updateById = async (id, {
  name,
  muscleGroup
}) => {
  const updateTraining = {
    name,
    muscleGroup
  };
  debugLog(`Updating training with id ${id}`, updateTraining);
  await trainingRepository.updateById(id, updateTraining);
  return getById(id);
}

const deleteById = async (id) => {
  debugLog(`Deleting training with id ${id}`);
  const deletedTraining = await trainingRepository.deleteById(id);

  if (!deletedTraining) {
    throw new Error(`Training with id ${id} does not exist`, {
      id
    });
  }
}

module.exports = {
  getAll,
  getByName,
  getById,
  create,
  updateById,
  deleteById
}