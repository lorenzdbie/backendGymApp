const appointmentService = require('../service/appointment')

const getAllAppointments = async (ctx) => {
  ctx.body = await appointmentService.getAll();
}

module.exports = {
  getAllAppointments,
}