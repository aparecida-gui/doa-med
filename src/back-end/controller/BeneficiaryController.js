import BeneficiaryModel from '../model/RegisterUser';
import MedicineBeneficiaryModel from '../model/Medicine_Beneficiary';

class Beneficiary {
  async showMedicineBeneficiary(req, res) {
    let medicineBeneficiary = await BeneficiaryModel.findAll({
      include: [
        { model: MedicineBeneficiaryModel, as: 'medicinesBeneficiary' },
      ],
    });

    if (medicineBeneficiary == 0) {
      res.status(400).json({ message: 'Não têm registros no banco de dados' });
    } else {
      res.status(200).json(medicineBeneficiary);
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
