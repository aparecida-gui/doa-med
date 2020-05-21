import BeneficiaryModel from '../model/Beneficiary';

class Beneficiary {
  async registerBeneficiary(req, res) {
    const { name, phone, city, email } = req.body;

    if (name !== '' && phone !== '' && city !== '' && email !== '') {
      const beneficiary = await BeneficiaryModel.create({
        name,
        phone,
        city,
        email,
      });

      res
        .status(200)
        .json({ message: `Seja bem-vindo(a) ${beneficiary.name}` });
    } else {
      res
        .status(400)
        .json({ message: 'Verifique se todos os campos foram preenchidos.' });
    }
  }
}

export default new Beneficiary();
