import jwt from './jwt';

const verifyAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const tokenValid = jwt.checkTokenIsValid(token);

  if (!tokenValid.messageError) {
    res.status(200).json(tokenValid);
    next();
  } else {
    res.status(401).json({ message: 'Uauário não autenticado.' });
  }
};

export default verifyAuthentication;
