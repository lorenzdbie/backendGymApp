const Router = require('@koa/router');
const Joi = require('joi').extend(require('@joi/date'));



// const swaggerConfig = require('../../swagger.config');

const appointmentService = require('../service/appointment');
const userService = require('../service/user');
const {
  hasPermission,
  permissions,
  addUserInfo,
} = require('../core/auth');


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


const getAllAppointmentsForUser = async (ctx) => {
  let userId = 0;
  const user = await userService.getByAuth0id(ctx.state.user.sub);
  userId = user.id;
  const appointments = await appointmentService.getAllAppointmentforUser(userId);
  console.log({
    ...appointments,
  });
  ctx.body = appointments;
};
getAllAppointmentsForUser.validationScheme = {
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
  let userId = 0;
  try {
    const user = await userService.getByAuth0id(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    userId = await userService.register({
      auth0id: ctx.state.user.sub,
      firstName: ctx.state.user.firstName,
      lastName: ctx.state.user.lastName,
      birthdate: ctx.state.user.birthdate,
      email: ctx.state.user.email,
      weight: ctx.state.user.weight,
      height: ctx.state.user.height,
    });
  }

  const newAppointment = await appointmentService.create({
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
    startTime: new Date(ctx.request.body.startTime),
    endTime: new Date(ctx.request.body.endTime),
    trainingId: Number(ctx.request.body.trainingId),
    userId,
  });
  ctx.body = newAppointment;
  ctx.status = 201;
};

createAppointment.validationScheme = {
  body: {
    date: Joi.date().required().iso().min(-1),
    trainingId: Joi.number().integer().positive().required(),
    startTime: Joi.date().required().iso().min('now'),
    endTime: Joi.date().required().iso().min('now'),
    intensity: Joi.number().integer().min(0).max(5).required(),
    specialRequest: Joi.string().allow(null, '').optional(),
  },
};


const updateAppointment = async (ctx) => {
  // let userId = 0;
  // const user = await userService.getByAuth0id(ctx.state.user.sub);
  // userId = user.id;
  ctx.body = await appointmentService.updateById(ctx.params.id, {
    ...ctx.request.body,
    userId: Number(ctx.request.body.userId),
    date: new Date(ctx.request.body.date),
    startTime: new Date(ctx.request.body.startTime),
    endTime: new Date(ctx.request.body.endTime),
    trainingId: Number(ctx.request.body.trainingId),
    // auth0id: ctx.state.user.sub,
  });
};
updateAppointment.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    userId: Joi.number().integer().positive().required(),
    date: Joi.date().required().iso().min(-1),
    trainingId: Joi.number().integer().positive().required(),
    startTime: Joi.date().required().iso().min('now'),
    endTime: Joi.date().required().iso().min('now'),
    intensity: Joi.number().integer().min(0).max(5).required(),
    specialRequest: Joi.string().allow(null, '').optional(),
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


  router.get('/', hasPermission(permissions.read), validate(getAllAppointmentsForUser.validationScheme), getAllAppointmentsForUser);
  router.get('/all', hasPermission(permissions.read), validate(getAllAppointments.validationScheme), getAllAppointments);
  router.get('/:id', hasPermission(permissions.read), validate(getAppointmentById.validationScheme), getAppointmentById);
  router.post('/', hasPermission(permissions.write), validate(createAppointment.validationScheme), createAppointment);
  router.put('/:id', hasPermission(permissions.write), validate(updateAppointment.validationScheme), updateAppointment);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteAppointment.validationScheme), deleteAppointment);


  app.use(router.routes()).use(router.allowedMethods());

};