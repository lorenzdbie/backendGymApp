const userRepository = require('../repository/user');
const {
  getLogger,
} = require('../core/logging');
const {
  hashPassword,
  verifyPassword,
} = require('../core/password');
const Role = require('../core/roles');
const {
  generateJWT,
  verifyJWT,
} = require('../core/jwt');


const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};


const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw new Error('you need to be signed in');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new Error('Invalid authorization token');
  }

  const authToken = authHeader.substr(7);

  try {
    const {
      UserId,
      roles,
    } = await verifyJWT(authToken);

    return {
      UserId,
      roles,
      authToken,
    };

  } catch (error) {
    const logger = getLogger('user-service');
    logger.error(error.message, {
      error,
    });
    throw new Error(error.message);
  }
};

const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw new Error('You do not have permission to visit this part of the application');
  }
};



const makeExposedUser = ({
  id,
  firstName,
  lastName,
  email,
  roles,
}) => ({
  id,
  firstName,
  lastName,
  email,
  roles,
});


const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};


const register = async ({
  firstName,
  lastName,
  birthdate,
  email,
  password,
  weight,
  height,
  credits,
}) => {

  const passwordHash = await hashPassword(password);

  const newUser = {
    firstName,
    lastName,
    birthdate,
    email,
    passwordHash,
    weight,
    height,
    credits,
    roles: [Role.USER],
  };

  debugLog('Creating a new user', {
    firstName,
    lastName,
  });
  const user = await userRepository.create(newUser);
  return await makeLoginData(user);
};


const login = async ({
  email,
  password,
}) => {
  debugLog('Logging in user', {
    email,
  });

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('The given email and password do not match');
  }

  const passwordValid = await verifyPassword(password, user.password_hash);
  if (!passwordValid) {
    throw new Error('The given email and password do not match');
  }

  return await makeLoginData(user);
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
  return user;
};

const updateById = async (id, {
  firstName,
  lastName,
  birthdate,
  email,
  password,
  weight,
  height,
  credits,
  role,
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
    password,
    weight,
    height,
    credits,
    role,
  });
  return getById(id);
};


const deleteById = async (id) => {
  debugLog(`Deleting user with id ${id}`);
  const deleted = await userRepository.deleteById(id);

  if (!deleted) {
    throw new Error(`User with id ${id} doesn't exist`, {
      id,
    });
  }
};


module.exports = {
  checkAndParseSession,
  checkRole,
  getAll,
  register,
  login,
  getById,
  updateById,
  deleteById,
};