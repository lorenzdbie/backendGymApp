const Router = require('@koa/router');
const Joi = require('joi');

const userService = require('../service/user');
const {
  hasPermission,
  permissions,
} = require('../core/auth');

const validate = require('./_validation');



const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
};
getAllUsers.validationScheme = {
  query: Joi.object({
    limit: Joi.number().integer().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};

const getUserById = async (ctx) => {
  const user = await userService.getById(Number(ctx.params.id));
  ctx.body = user;
};
getUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const register = async (ctx) => {
  const auth0id = ctx.state.user.sub;

  // console.log(...ctx.state.user);
  // console.log(`auth0id: ${auth0id}`);
  // console.log(`firstname: ${ctx.request.body.firstName}`);
  // console.log(`lastname: ${ctx.request.body.lastName}`);
  // console.log(`birthdate: ${ctx.request.body.birthdate}`);
  // console.log(`email: ${ctx.request.body.email}`);
  // console.log(`weight: ${ctx.request.body.weight}`);
  // console.log(`height: ${ctx.request.body.height}`);

  const session = await userService.register({
    ...ctx.request.body,
    birthdate: new Date(ctx.request.body.birthdate),
    auth0id,
  });
  ctx.body = session;
  ctx.status = 201;
};
register.validationScheme = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthdate: Joi.date().required(),
    email: Joi.string().email().required(),
    weight: Joi.number().positive().optional(),
    height: Joi.number().positive().optional(),
    credits: Joi.number().positive().optional(),
  },
};

// const login = async (ctx) => {
//   const {
//     email,
//     password,
//   } = ctx.request.body;
//   const session = await userService.login(email, password);
//   ctx.body = session;
// };
// login.validationScheme = {
//   body: {
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   },
// };


const updateUserById = async (ctx) => {
  ctx.body = await userService.updateById(ctx.params.id, {
    ...ctx.request.body,
    birthdate: new Date(ctx.request.body.birthdate),
  });
};
updateUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthdate: Joi.date().required(),
    email: Joi.string().email().required(),
    weight: Joi.number().positive().optional(),
    height: Joi.number().positive().optional(),
    credits: Joi.number().positive().optional(),
  },
};


const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

module.exports = function installUserRouter(app) {
  const userRouter = new Router({
    prefix: '/users',
  });

  userRouter.post('/register', hasPermission(permissions.write), validate(register.validationScheme), register);
  // userRouter.post('/login', validate(login.validationScheme), login);

  userRouter.get('/', hasPermission(permissions.read), validate(getAllUsers.validationScheme), getAllUsers);
  userRouter.get('/:id', hasPermission(permissions.read), validate(getUserById.validationScheme), getUserById);
  userRouter.put('/:id',hasPermission(permissions.write), validate(updateUserById.validationScheme), updateUserById);
  userRouter.delete('/:id',hasPermission(permissions.write), validate(deleteUserById.validationScheme), deleteUserById);

  app.use(userRouter.routes())
    .use(userRouter.allowedMethods());
};