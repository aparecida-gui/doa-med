import BeneficiaryModel from '../model/Beneficiary';
import MedicineBeneficiaryModel from '../model/Medicine_Beneficiary';

class Beneficiary {
  async registerBeneficiary(req, res) {
    const { name, phone, city, email, password } = req.body;

    if (
      name !== '' &&
      phone !== '' &&
      city !== '' &&
      email !== '' &&
      password !== ''
    ) {
      const beneficiary = await BeneficiaryModel.create({
        name,
        phone,
        city,
        email,
        password,
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

  async showMedicineBeneficiary(req, res) {
    let medicineBeneficiary = await BeneficiaryModel.findAll({
      include: [
        { model: MedicineBeneficiaryModel, as: 'medicinesBeneficiary' },
      ],
    });

    let newMedicineBeneficiary = Object.entries(medicineBeneficiary);

    if (newMedicineBeneficiary == 0) {
      res.status(400).json({ message: 'Não têm registros no banco de dados' });
    } else {
      res.status(200).json({ newMedicineBeneficiary });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    let loginBeneficiary = await BeneficiaryModel.findOne({
      where: { email, password },
    });

    if (loginBeneficiary !== null) {
      res.status(200).json(loginBeneficiary);
    } else {
      res.status(404).json({ message: 'Usuário não existe.' });
    }
  }
}

export default new Beneficiary();
