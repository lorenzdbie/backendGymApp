const userRepository = require('../repository/user')

const {
  getLogger
} = require('../core/logging');


const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all users');
  const users = await userRepository.findAll();
  const totalCount = await userRepository.findCount();
  return {
    users,
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
  debugLog('Creating a new user', {
    user_firstName,
    user_lastName
  });
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
  debugLog('Logging in user', {
    email
  });
  const user = await userRepository.findByEmailAndPassword({
    email,
    password
  });
  return user;
}

const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`);
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
  debugLog(`Updating user with id ${id}`, {
    user_firstName,
    user_lastName
  });
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
  debugLog(`Deleting user with id ${id}`);
  const deleted = await userRepository.deleteById(id);

  if (!deleted) {
    throw new Error(`User with id ${id} doesn't exist`, {
      id
    });
  }
}

module.exports = {
  getAll,
  register,
  login,
  getById,
  updateById,
  deleteById,
}