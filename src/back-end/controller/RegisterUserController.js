import RegisterUserModel from '../model/RegisterUser';
import encrypData from '../help/encryptData';
import jwt from '../help/jwt';

const data = (dataRequest) => {
  if (!dataRequest.name) {
    return { message: 'O campo nome está Vaziu' };
  } else if (!dataRequest.phone) {
    return { message: 'O campo telefone está Vaziu' };
  } else if (!dataRequest.city) {
    return { message: 'O campo cidade está Vaziu' };
  } else if (!dataRequest.email) {
    return { message: 'O campo email está Vaziu' };
  } else if (!dataRequest.password) {
    return { message: 'O campo senha está Vaziu' };
  } else {
    return true;
  }
};

class RegisterUser {
  static async userVerify(user) {
    const verify = await RegisterUserModel.findAll({
      where: { email: user.email },
    });

    if (verify.length > 0) {
      return { message: 'Usuário já cadastrado.' };
    } else {
      return true;
    }
  }

  async register(req, res) {
    const { name, phone, city, email, password } = req.body;
    const isUserExit = await RegisterUser.userVerify(req.body);
    let validData = data(req.body);
    const token = await jwt.generationToken();

    try {
      if (validData === true && isUserExit === true && token.length > 0) {
        const hashPassword = encrypData.hashPassword(req.body.password);
        req.body.password = hashPassword;

        const user = await RegisterUserModel.create({
          name,
          phone,
          city,
          email,
          password,
        });

        res.status(200).json({
          messageSuccess: `Seja bem-vindo(a) ao DoaMed ${name}`,
          token,
        });
      } else {
        return res.status(400).json({ validData, isUserExit, token });
      }
    } catch (error) {
      res.status(400).json({
        messageError: error,
      });
    }
  }
}

export default new RegisterUser();
