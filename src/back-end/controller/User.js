import UserModel from '../model/User';
import encrypData from '../help/encryptData';
import jwt from '../help/jwt';
import validatesData from '../help/validatesData';

class User {
  static async userVerify(user) {
    const verify = await UserModel.findAll({
      where: { email: user.email },
    });

    if (verify.length > 0) {
      return { message: 'Usuário já cadastrado.' };
    } else {
      return true;
    }
  }

  async register(req, res) {
    const isUserExit = await User.userVerify(req.body);
    let validData = validatesData.userDatas(req.body);

    try {
      if (validData === true && isUserExit === true) {
        const token = await jwt.generationToken();
        if (token.length > 0) {
          const hashPassword = encrypData.hashPassword(req.body.password);
          req.body.password = hashPassword;

          await UserModel.create(req.body);

          res.status(201).json({
            messageSuccess: `Seja bem-vindo(a) ao DoaMed`,
            token: token,
          });
        } else {
          res.status(400).json({ token });
        }
      } else {
        res.status(400).json({ validData, isUserExit });
      }
    } catch (error) {
      res.status(400).json({
        messageError: error,
      });
    }
  }
}

export default new User();
