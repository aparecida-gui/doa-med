import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = (password) => bcrypt.hashSync(password, saltRounds);

const checkPassword = async (password, passwordBD) =>
  bcrypt.compareSync(password, passwordBD);

export default { hashPassword, checkPassword };
