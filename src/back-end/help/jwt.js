import jsonwebtoken from 'jsonwebtoken';

const generationToken = async () => {
  try {
    const token = await jsonwebtoken.sign({ foo: 'burge' }, 'test');
    return token;
  } catch (error) {
    return { message: 'Token não foi gerado.' };
  }
};

const tokenVerify = () => {
  jsonwebtoken.verify();
};

export default { generationToken, tokenVerify };
