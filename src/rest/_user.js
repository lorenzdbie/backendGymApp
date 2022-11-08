const Router = require('@koa/router');
const userService = require('../service/user');

const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
}

const getUserById = async (ctx) => {
  const user = await userService.getById(ctx.params.id);
  ctx.body = user;
}

const register = async (ctx) => {
  const user = userService.register(ctx.params.name);
  ctx.body = user;
}

const login = async (ctx) => {
  const user = userService.login(ctx.params.email, ctx.params.password);
  ctx.body = user;
}


const updateUserById = async (ctx) => {
  const user = await userService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
  ctx.body = user;
}


const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
}

module.exports = function installUserRouter(app) {
  const userRouter = new Router(
    {prefix: '/users'}
  );

  userRouter.get('/', getAllUsers);
  userRouter.get('/:id', getUserById);
  userRouter.post('/', register);
  userRouter.post('/login', login);
  userRouter.put('/:id', updateUserById);
  userRouter.delete('/:id', deleteUserById);

  app.use(userRouter.routes())
    .use(userRouter.allowedMethods());
}

// module.exports = {
//   getAllUsers,
//   getUserById,
//   register,
//   login,
//   updateUserById,
//   deleteUserById,
// }