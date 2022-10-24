const userRepository = require('../repository/user')

const getAll = async () => {
  const items = await userRepository.findAll();
  const totalCount = await userRepository.findCount();
  return {
    items,
    count: totalCount,
  }
};

const register = async ({
  user_firstName,
  user_lastName,
  birthdate,
  email,
  password,
  weight,
  height,
  credits,
  role
}) => {
  return await userRepository.create({
    user_firstName,
    user_lastName,
    birthdate,
    email,
    password,
    weight,
    height,
    credits,
    role
  })
}

const login = async ({
  email,
  password
}) => {
  const user = await userRepository.findByEmailAndPassword({
    email,
    password
  });
  return user;
}

const getById = async (id) => {
  const user = await userRepository.findById(id);
  return user;
}

const updateById = async (id, {
  user_firstName,
  user_lastName,
  birthdate,
  email,
  password,
  weight,
  height,
  credits,
  role
}) => {
  return await userRepository.updateById(id, {
    user_firstName,
    user_lastName,
    birthdate,
    email,
    password,
    weight,
    height,
    credits,
    role
  });
}

const deleteById = async (id) => {
  await userRepository.deleteById(id);
}

module.exports = {
  getAll,
  register,
  login,
  getById,
  updateById,
  deleteById,
}