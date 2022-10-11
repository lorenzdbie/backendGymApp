const trainingService = require('../service/training');

const getAllTrainings = async (ctx) => {
  ctx.body = await trainingService.getAll();
}

module.exports = {
  getAllTrainings,
}