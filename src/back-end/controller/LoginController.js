import BeneficiaryModel from '../model/RegisterUser';
import validatesData from '../help/validatesData';

class LoginController {
  async login(req, res) {
    const validateDataLogin = validatesData.loginData(req.body);
    const { email, password } = req.body;
    let loginBeneficiary = null;

    try {
      if (validateDataLogin === true) {
        loginBeneficiary = await BeneficiaryModel.findOne({
          where: { email, password },
        });
        if (loginBeneficiary) {
          res.status(200).json({ messageSuccess: 'Olá seja bem-vindo(a)' });
        }
        return res.status(404).json({ message: 'Usuário não existe.' });
      }
      res.status(400).json(validateDataLogin);
    } catch (error) {
      res.status(400).json({ messageError: error });
    }
  }
}

export default new LoginController();
