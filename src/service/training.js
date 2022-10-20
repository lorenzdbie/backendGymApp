const trainingRepository = require('../repository/training');

const getAll = async () => {
  const items = await trainingRepository.findAll();
  const totalCount = await trainingRepository.count();
  return {
    items,
    count: totalCount,
  };
}

const getByName = async (name) => {
  return await trainingRepository.findByName(name);
}

const getById = async (id) => {
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
  await trainingRepository.updateById(id, updateTraining);
  return getById(id);
}

const deleteById = async (id) => {
  await trainingRepository.deleteById(id);
}

module.exports = {
  getAll,
  getByName,
  getById,
  create,
  updateById,
  deleteById
}