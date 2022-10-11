const appointmentDetailsRepository = require('../repository/appointmentDetails');

const getAll = async () => {
  const items = await appointmentDetailsRepository.findAll();
  return {
    items,
    count: items.length,
  }
};

module.exports = {
  getAll,
}