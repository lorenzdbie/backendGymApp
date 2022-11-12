const Router = require('@koa/router');

const trainingService = require('../service/training');
// const {requireAuthentications, makeRequireRole} = require('../core/auth');
// const Role = require('../core/roles');

const getAllTrainings = async (ctx) => {
  ctx.body = await trainingService.getAll();
};

const getTrainingById = async (ctx) => {
  ctx.body = await trainingService.getById(Number(ctx.params.id));
};


const createTraining = async (ctx) => {
  const newTraining = await trainingService.create(ctx.request.body);
  ctx.body = newTraining;
  ctx.status = 201;
};

const updateTrainingById = async (ctx) => {
  ctx.body = await trainingService.updateById(ctx.params.id, ctx.request.body);
};

const deleteTrainingById = async (ctx) => {
  await trainingService.deleteById(ctx.params.id);
  ctx.status = 204;
};


module.exports = (app) => {
  const router = new Router({
    prefix: '/trainings',
  });

  // const requireAdmin = makeRequireRole(Role.ADMIN);

  // router.get('/', requireAuthentications, getAllTrainings);
  // router.get('/:id', requireAuthentications, getTrainingById);
  // router.post('/', requireAuthentications, requireAdmin, createTraining);
  // router.put('/:id', requireAuthentications, requireAdmin, updateTrainingById);
  // router.delete('/:id', requireAuthentications, requireAdmin, deleteTrainingById);

  router.get('/', getAllTrainings);
  router.get('/:id', getTrainingById);
  router.post('/', createTraining);
  router.put('/:id', updateTrainingById);
  router.delete('/:id', deleteTrainingById);

  app.use(router.routes()).use(router.allowedMethods());

};