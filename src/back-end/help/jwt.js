import jsonwebtoken from 'jsonwebtoken';

const generationToken = () => {
  return jsonwebtoken.sign({ foo: 'burge' }, 'test');
};

const tokenVerify = () => {
  jsonwebtoken.verify();
};

export default { generationToken, tokenVerify };
