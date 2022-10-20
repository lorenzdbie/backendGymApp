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
}



const updateAppointment = async (ctx) => {
  ctx.body = await appointmentService.updateById(ctx.params.id, {...ctx.request.body});
}



const deleteAppointment = async (ctx) => {
  await appointmentService.deleteById(ctx.params.id);
}


module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
}