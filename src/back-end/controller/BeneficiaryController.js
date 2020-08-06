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
}

export default new Beneficiary();
