const trainingRepository = require('../repository/training');

const getAll = async () => {
  const items = await trainingRepository.findAll();
  return {
    items,
    count: items.length,
  };
}

module.exports = {
  getAll,
}