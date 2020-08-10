import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const generationToken = async () => {
  try {
    const token = await jsonwebtoken.sign(
      { foo: 'burge' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    return token;
  } catch (error) {
    return { message: 'Token não foi gerado.' };
  }
};

const checkTokenIsValid = async (token) => {
  try {
    return await jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (messageError) {
    return { messageError: 'Token inválido.' };
  }
};

export default { generationToken, checkTokenIsValid };
