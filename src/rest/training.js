const trainingService = require('../service/training');

const getAllTrainings = async (ctx) => {
  ctx.body = await trainingService.getAll();
}



const getTrainingById = async (ctx) => {
  ctx.body = await trainingService.getById(ctx.params.id);
}



const getTrainingByName = async (ctx) => {
  ctx.body = await trainingService.getByName(ctx.params.name);
}



const createTraining = async (ctx) => {
  const newTraining = await trainingService.create({
    ...ctx.request.body
  });
  ctx.body = newTraining;
}



const updateTrainingById = async (ctx) => {
  ctx.body = await trainingService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
}


const deleteTrainingById = async (ctx) => {
  await trainingService.deleteById(ctx.params.id);
}



module.exports = {
  getAllTrainings,
  getTrainingById,
  getTrainingByName,
  createTraining,
  updateTrainingById,
  deleteTrainingById,
}