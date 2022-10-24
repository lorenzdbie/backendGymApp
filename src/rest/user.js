const userService = require('../service/user');

const getAllUsers = async (ctx) => {
  ctx.body = await userService.getAll();
}

const getUserById = async (ctx) => {
  const user = await userService.getById(ctx.params.id);
  ctx.body = user;
}

const register = async (ctx) => {
  const user = userService.register(ctx.params.name);
  ctx.body = user;
}

const login = async(ctx) =>  {
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
}

module.exports = {
  getAllUsers,
  getUserById,
  register,
  login,
  updateUserById,
  deleteUserById,
}