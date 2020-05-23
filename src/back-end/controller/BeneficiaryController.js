import BeneficiaryModel from '../model/Beneficiary';
import MedicineBeneficiaryModel from '../model/Medicine_Beneficiary';

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

  async showMedicineBeneficiary(req, res) {
    let medicineBeneficiary = await BeneficiaryModel.findAll({
      include: [
        { model: MedicineBeneficiaryModel, as: 'medicinesBeneficiary' },
      ],
    });

    let newMedicineBeneficiary = Object.entries(medicineBeneficiary);

    if (newMedicineBeneficiary.length > 0) {
      res.status(200).json({ newMedicineBeneficiary });
    }
    if (newMedicineBeneficiary.length < 0) {
      res.status(400).json({ message: 'Nenhum registro cadastrado.' });
    }
  }
}

export default new Beneficiary();
