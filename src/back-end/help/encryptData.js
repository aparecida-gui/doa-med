import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = (my_password) => bcrypt.hashSync(my_password, saltRounds);

const checkPassword = async (my_password, passwordBD) => {
  const result = bcrypt.compareSync(my_password, passwordBD);
  if (result) {
    return { messageSucess: 'Senha está ok.' };
  } else {
    return { messageError: 'Senha Inválida.' };
  }
};

export default { hashPassword, checkPassword };
