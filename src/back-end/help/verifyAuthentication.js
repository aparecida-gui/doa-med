import jwt from './jwt';
import { async } from 'regenerator-runtime';

const verifyAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const tokenValid = await jwt.checkTokenIsValid(token);

  if (!tokenValid.messageError) {
    next();
  } else {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }
};

export default verifyAuthentication;
