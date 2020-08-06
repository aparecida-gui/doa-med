import RegisterModel from '../model/RegisterUser';
import validatesData from '../help/validatesData';
import encryptData from '../help/encryptData';

class LoginController {
  async login(req, res) {
    const validateDataLogin = validatesData.loginData(req.body);
    const { email, password } = req.body;
    let loginBeneficiary = null;

    try {
      if (validateDataLogin === true) {
        loginBeneficiary = await RegisterModel.findOne({
          where: { email },
        });

        if (loginBeneficiary) {
          const checkData = await encryptData.checkPassword(
            password,
            loginBeneficiary.password
          );
          if (checkData.messageSucess) {
            res.status(200).json({ messageOk: 'Olá seja bem-vindo(a)' });
          } else {
            return res.status(404).json({
              messagePassword: checkData.messageError,
            });
          }
        } else {
          res.status(404).json({ message: 'Usuário não cadastrado.' });
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
