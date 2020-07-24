import RegisterUserModel from '../model/RegisterUser';
import encrypData from '../help/encryptData';

class RegisterUser {
  async register(req, res) {
    const hashPassword = encrypData.hashPassword(req.body.password);
    req.body.password = hashPassword;

    const { name, phone, city, email, password } = req.body;

    try {
      if (name && phone && city && email && password) {
        await RegisterUserModel.create({
          name,
          phone,
          city,
          email,
          password,
        });
        res.status(200).json({
          messageSuccess: `Seja bem-vindo(a) ao DoaMed ${name}`,
        });
      } else {
        res.json({
          message: 'Por Favor verifique se todos os campos estão preenchidos.',
        });
      }
    } catch (error) {
      res.status(400).json({
        messageError: error,
      });
    }
  }
}

export default new RegisterUser();
