const Router = require('@koa/router');

// const swaggerConfig = require('../../swagger.config');
const appointmentService = require('../service/appointment');
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
  ctx.body = await appointmentService.getAll();
};



const getAppointmentById = async (ctx) => {
  ctx.body = await appointmentService.getById(ctx.params.id);
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



const updateAppointment = async (ctx) => {
  ctx.body = await appointmentService.updateById(ctx.params.id, {
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
    startTime: new Date(ctx.request.body.startTime),
    endTime: new Date(ctx.request.body.endTime),
  });
};



const deleteAppointment = async (ctx) => {
  await appointmentService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/appointments',
  });

  router.get('/', getAllAppointments);
  router.get('/:id', getAppointmentById);
  router.post('/', createAppointment);
  router.put('/:id', updateAppointment);
  router.delete('/:id', deleteAppointment);

  app.use(router.routes()).use(router.allowedMethods());

};