const userDatas = (dataRequest) => {
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

export default { userDatas };
