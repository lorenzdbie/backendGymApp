const appointmentDetailService = require('../service/appointmentDetails');

const getAllAppointmentDetails = async (ctx) => {
  ctx.body = await appointmentDetailService.getAll();
}

module.exports = {
  getAllAppointmentDetails,
}