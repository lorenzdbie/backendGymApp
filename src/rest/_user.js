const Router = require('@koa/router');
const Joi = require('joi');

const userService = require('../service/user');

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

// const register = async (ctx) => {
//   const session = await userService.register({
//     ...ctx.request.body,
//     birthdate: new Date(ctx.request.body.birthdate),
//   });
//   ctx.body = session;
//   ctx.status = 201;
// };
// register.validationScheme = {
//   body: {
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     birthdate: Joi.date().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     weight: Joi.number().positive().optional(),
//     height: Joi.number().positive().optional(),
//     credits: Joi.number().positive().optional(),
//     role: Joi.string().optional(),
//   },
// };

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
    password: Joi.string().required(),
    weight: Joi.number().positive().optional(),
    height: Joi.number().positive().optional(),
    credits: Joi.number().positive().optional(),
    role: Joi.string().optional(),
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

  // userRouter.post('/register', validate(register.validationScheme), register);
  // userRouter.post('/login', validate(login.validationScheme), login);

  userRouter.get('/', validate(getAllUsers.validationScheme), getAllUsers);
  userRouter.get('/:id', validate(getUserById.validationScheme), getUserById);
  userRouter.put('/:id', validate(updateUserById.validationScheme), updateUserById);
  userRouter.delete('/:id', validate(deleteUserById.validationScheme), deleteUserById);

  app.use(userRouter.routes())
    .use(userRouter.allowedMethods());
};