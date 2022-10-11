const userService = require('../service/user');

const getAllUsers = async (ctx) => {
  ctx.body = await userService.getAll();
}

module.exports = {
  getAllUsers,
}