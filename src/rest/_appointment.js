const Router = require('@koa/router');
const appointmentService = require('../service/appointment')

const getAllAppointments = async (ctx) => {
  ctx.body = await appointmentService.getAll();
}



const getAppointmentById = async (ctx) => {
  ctx.body = await appointmentService.getById(ctx.params.id);
}



const createAppointment = async (ctx) => {
  const newAppointment = await appointmentService.create(...ctx.request.body);
  ctx.body = newAppointment;
  ctx.status = 201;
}



const updateAppointment = async (ctx) => {
  ctx.body = await appointmentService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
}



const deleteAppointment = async (ctx) => {
  await appointmentService.deleteById(ctx.params.id);
  ctx.status = 204;
}

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