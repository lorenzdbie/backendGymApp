const userRepository = require('../repository/user')

const getAll = async () => {
  const items = await userRepository.findAll();
  const totalCount = await userRepository.findCount();
  return {
    items,
    count: totalCount,
  }
};

const register = async (name) => {
  return await userRepository.create({
    name,
  })
}

const getById = async (id) => {
  const user = await userRepository.findById(id);
  return user;
}

const updateById = async (id, {
  name
}) => {
  return await userRepository.updateById(id, {
    name
  });
}

const deleteById = async (id) => {
  await userRepository.deleteById(id);
}

module.exports = {
  getAll,
  register,
  getById,
  updateById,
  deleteById,
}