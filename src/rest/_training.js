const Router = require('@koa/router');
const Joi = require('joi');

const trainingService = require('../service/training');
const {
  hasPermission,
  permissions,
} = require('../core/auth');

const validate = require('./_validation');

const getAllTrainings = async (ctx) => {
  ctx.body = await trainingService.getAll();
};
getAllTrainings.validationScheme = {
  query: Joi.object({
    limit: Joi.number().integer().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};


const getTrainingById = async (ctx) => {
  ctx.body = await trainingService.getById(Number(ctx.params.id));
};
getTrainingById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};


const createTraining = async (ctx) => {
  const newTraining = await trainingService.create(ctx.request.body);
  ctx.body = newTraining;
  ctx.status = 201;
  
};
createTraining.validationScheme = {
  body: {
    name: Joi.string().required(),
    muscleGroup: Joi.string().required(),
  },
};


const updateTrainingById = async (ctx) => {
  ctx.body = await trainingService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};
updateTrainingById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    name: Joi.string().required(),
    muscleGroup: Joi.string().required(),
  },
};


const deleteTrainingById = async (ctx) => {
  await trainingService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteTrainingById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};


module.exports = (app) => {
  const router = new Router({
    prefix: '/trainings',
  });


  router.get('/', hasPermission(permissions.read), validate(getAllTrainings.validationScheme), getAllTrainings);
  router.get('/:id', hasPermission(permissions.read), validate(getTrainingById.validationScheme), getTrainingById);
  router.post('/', hasPermission(permissions.write), validate(createTraining.validationScheme), createTraining);
  router.put('/:id', hasPermission(permissions.write), validate(updateTrainingById.validationScheme), updateTrainingById);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteTrainingById.validationScheme), deleteTrainingById);

  app.use(router.routes()).use(router.allowedMethods());

};