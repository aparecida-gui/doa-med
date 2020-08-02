const userDatas = (dataRequest) => {
  if (!dataRequest.name) {
    return { message: 'O campo nome está Vaziu' };
  } else if (typeof dataRequest.name !== 'string') {
    return { message: 'O campo nome não aceita números.' };
  } else if (!dataRequest.phone) {
    return { message: 'O campo telefone está Vaziu' };
  } else if (!dataRequest.city) {
    return { message: 'O campo cidade está Vaziu' };
  } else if (typeof dataRequest.city !== 'string') {
    return { message: 'O campo cidade não aceita números.' };
  } else if (!dataRequest.email) {
    return { message: 'O campo email está Vaziu' };
  } else if (typeof dataRequest.email !== 'string') {
    return { message: 'O campo email não aceita números.' };
  } else if (!dataRequest.password) {
    return { message: 'O campo senha está Vaziu' };
  } else if (dataRequest.password.length < 6) {
    return { message: 'A sua senha deve conter no minimo 6 caracteres.' };
  } else if (dataRequest.password.length > 12) {
    return {
      message: 'Senha muito grande tamanho máximo são 12 caracteres',
    };
  } else {
    return true;
  }
};

export default { userDatas };
