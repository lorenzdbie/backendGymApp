const userRepository = require('../repository/user')

const getAll = async () => {
  const items = await userRepository.findAll();
  const totalCount = await userRepository.findCount();
  return {
    items,
    count: totalCount,
  }
};

const getById = async (id) => {

  const user = await userRepository.findById(id);
  return user;
}

module.exports = {
  getAll,
  getById
}