const {hashPassword, verifyPassword} = require('./core/password');

async function main() {
  const password = 'thisMustBeDifficult';
  const wrongPassword = 'thisMustBeWrong!';
  console.log('password:', password);

  const hash = await hashPassword(password);
  console.log('hash:', hash);

  let valid = await verifyPassword(password, hash);
  console.log('The password', password, 'is', valid ? 'valid' : 'incorrect');

  valid = await verifyPassword(wrongPassword, hash);
  console.log('The password', wrongPassword, 'is', valid ? 'valid' : 'incorrect');
}
main();