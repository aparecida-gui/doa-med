import Beneficiary from '../model/RegisterUser';
import MedicineBeneficiaryModel from '../model/Medicine_Beneficiary';

class MedicineBeneficiary {
  async registerMedicineBeneficiary(req, res) {
    const { beneficiary_id } = req.params;
    const beneficiary = await Beneficiary.findByPk(beneficiary_id);

    const { name, quantity, prescription } = req.body;

    if (!beneficiary) {
      res
        .status(400)
        .json({ message: 'Não foi encontrado o beneficiário indicado.' });
    } else {
      if (name !== '' && quantity !== '' && prescription !== null) {
        const medicineBeneficiary = await MedicineBeneficiaryModel.create({
          name,
          quantity,
          prescription,
        });
        const associanteBeneficiary = await beneficiary.addMedicinesBeneficiary(
          medicineBeneficiary
        );

        if (associanteBeneficiary) {
          res.status(200).json({
            message: `O medicamento ${medicineBeneficiary.name} foi cadastrado com sucesso.`,
          });
        } else {
          res
            .status(400)
            .json({ message: 'Não foi possível cadastrar o medicamento.' });
        }
      }
    }
  }
}

export default new MedicineBeneficiary();
