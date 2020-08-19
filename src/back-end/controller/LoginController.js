import RegisterModel from '../model/RegisterUser';
import validatesData from '../help/validatesData';
import encryptData from '../help/encryptData';
import jwt from '../help/jwt';

class LoginController {
  async login(req, res) {
    const validateDataLogin = validatesData.loginData(req.body);
    const { email, password } = req.body;
    let emailExists = null;

    try {
      if (validateDataLogin === true) {
        emailExists = await RegisterModel.findOne({
          where: { email },
        });

        if (emailExists) {
          const checkData = await encryptData.checkPassword(
            password,
            emailExists.password
          );
          const token = await jwt.generationToken();

          if (checkData.messageSucess && token) {
            res
              .status(200)
              .json({ messageOk: 'Olá seja bem-vindo(a)', token: token });
          } else {
            return res.status(404).json({
              messagePassword: checkData.messageError,
              messageTokenError: token.message,
            });
          }
        } else {
          res.status(401).json({ message: 'Usuário não cadastrado.' });
        }
      } else {
        res.status(400).json(validateDataLogin);
      }
    } catch (error) {
      res.status(400).json({ messageError: error });
    }
  }
}

export default new LoginController();
