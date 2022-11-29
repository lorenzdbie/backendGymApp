const userRepository = require('../repository/user');
const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');


const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};


const register = async ({
  firstName,
  lastName,
  birthdate,
  email,
  weight,
  height,
  credits = 3,
  auth0id,
}) => {


  const newUser = {
    firstName,
    lastName,
    birthdate,
    email,
    weight,
    height,
    credits,
    auth0id,
  };

  debugLog('Creating a new user', {
    firstName,
    lastName,
  });
  const user = await userRepository.create(newUser);
  return user;
};

const getByAuth0id = async (auth0id) => {
  debugLog(`Fetching user with auth0id ${auth0id}`);
  const user = await userRepository.findByAuth0id(auth0id);

  if (!user) {
    throw ServiceError.notFound(`No user with id ${auth0id} exists`, {
      auth0id,
    });
  }
  return user;
};


const getAll = async () => {
  debugLog('Fetching all users');
  const users = await userRepository.findAll();
  const totalCount = await userRepository.findCount();
  return {
    users,
    count: totalCount,
  };
};


const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`);
  const user = await userRepository.findById(id);
  if (!user) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }
  return user;
};

const updateById = async (id, {
  firstName,
  lastName,
  birthdate,
  email,
  weight,
  height,
  credits,
}) => {
  debugLog(`Updating user with id ${id}`, {
    firstName,
    lastName,
  });
  await userRepository.updateById(id, {
    firstName,
    lastName,
    birthdate,
    email,
    weight,
    height,
    credits,
  });
  return getById(id);
};


const deleteById = async (id) => {
  debugLog(`Deleting user with id ${id}`);
  const deleted = await userRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`User with id ${id} doesn't exist`, {
      id,
    });
  }
};


module.exports = {
  getAll,
  register,
  getByAuth0id,
  getById,
  updateById,
  deleteById,
};