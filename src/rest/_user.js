const Router = require('@koa/router');

const userService = require('../service/user');
// const {requireAuthentications, makeRequireRole} = require('../core/auth');
// const Role = require('../core/roles');



const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
};

const getUserById = async (ctx) => {
  const user = await userService.getById(Number(ctx.params.id));
  ctx.body = user;
};

const register = async (ctx) => {
  const session = await userService.register({
    ...ctx.request.body,
    birthdate: new Date(ctx.request.body.birthdate),
  });
  ctx.body = session;
  ctx.status = 201;

};

const login = async (ctx) => {
  const {
    email,
    password,
  } = ctx.request.body;
  const session = await userService.login(email, password);
  ctx.body = session;
};


const updateUserById = async (ctx) => {
  ctx.body = await userService.updateById(ctx.params.id, {
    ...ctx.request.body,
    birthdate: new Date(ctx.request.body.birthdate),
  });
};


const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};

module.exports = function installUserRouter(app) {
  const userRouter = new Router({
    prefix: '/users',
  });

  userRouter.post('/register', register);
  userRouter.post('/login', login);

  // const requireAdmin = makeRequireRole(Role.ADMIN);

  // userRouter.get('/',requireAuthentications, requireAdmin ,getAllUsers);
  // userRouter.get('/:id', requireAuthentications, getUserById);
  // userRouter.put('/:id', requireAuthentications, updateUserById);
  // userRouter.delete('/:id', requireAuthentications, deleteUserById);

  userRouter.get('/',getAllUsers);
  userRouter.get('/:id', getUserById);
  userRouter.put('/:id', updateUserById);
  userRouter.delete('/:id', deleteUserById);

  app.use(userRouter.routes())
    .use(userRouter.allowedMethods());
};