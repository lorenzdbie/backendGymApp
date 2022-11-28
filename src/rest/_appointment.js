const Router = require('@koa/router');
const Joi = require('joi');

// const swaggerConfig = require('../../swagger.config');
const appointmentService = require('../service/appointment');


const validate = require('./_validation');

// /**
//  * @swagger
//  *tags:
//  *  name: Appointments
//  *  description: Represents made fitness appointments
//  */

// /**
//  * @swagger
//  * /api/appointments:
//  *   get:
//  *     summary: Get all appointments(paginated)
//  *     parameters:
//  *        -$ref: '#/components/parameters/limitParam'
//  *        -$ref: '#/components/parameters/offsetParam'
//  *     responses:
//  *        200:
//  *           description: A list of appointments
//  *           content:
//  *              application/json:
//  *                 schema:
//  *                    $ref: '#/components/schemas/AppointmentList'
//  *       
//  * 
//  * 
//  */
const getAllAppointments = async (ctx) => {
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  ctx.body = await appointmentService.getAll(limit, offset);
};
getAllAppointments.validationScheme = {
  query: Joi.object({
    limit: Joi.number().integer().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};


const getAppointmentById = async (ctx) => {
  ctx.body = await appointmentService.getById(ctx.params.id);
};
getAppointmentById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};


const createAppointment = async (ctx) => {
  const newAppointment = await appointmentService.create({
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
    startTime: new Date(ctx.request.body.startTime),
    endTime: new Date(ctx.request.body.endTime),
  });
  ctx.body = newAppointment;
  ctx.status = 201;
};
createAppointment.validationScheme = {
  body: {
    date: Joi.date().required().iso().min('now'),
    userId: Joi.number().integer().positive().required(),
    trainingId: Joi.number().integer().positive().required(),
    startTime: Joi.date().required().iso().min('now'),
    endTime: Joi.date().required().iso().min('now'),
    intensity: Joi.number().integer().min(0).max(5).required(),
    specialRequest: Joi.string().optional(),

  },
};


const updateAppointment = async (ctx) => {
  ctx.body = await appointmentService.updateById(ctx.params.id, {
    ...ctx.request.body,
    userId: Number(ctx.request.body.userId),
    date: new Date(ctx.request.body.date),
    startTime: new Date(ctx.request.body.startTime),
    endTime: new Date(ctx.request.body.endTime),
    trainingId: Number(ctx.request.body.trainingId),
  });
};
updateAppointment.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    date: Joi.date().required().iso().min('now'),
    userId: Joi.number().integer().positive().required(),
    trainingId: Joi.number().integer().positive().required(),
    startTime: Joi.date().required().iso().min('now'),
    endTime: Joi.date().required().iso().min('now'),
    intensity: Joi.number().integer().min(0).max(5).required(),
    specialRequest: Joi.string().optional(),
  },
};


const deleteAppointment = async (ctx) => {
  await appointmentService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteAppointment.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};


module.exports = (app) => {
  const router = new Router({
    prefix: '/appointments',
  });

  router.get('/', validate(getAllAppointments.validationScheme), getAllAppointments);
  router.get('/:id', validate(getAppointmentById.validationScheme), getAppointmentById);
  router.post('/', validate(createAppointment.validationScheme), createAppointment);
  router.put('/:id', validate(updateAppointment.validationScheme), updateAppointment);
  router.delete('/:id', validate(deleteAppointment.validationScheme), deleteAppointment);


  app.use(router.routes()).use(router.allowedMethods());

};