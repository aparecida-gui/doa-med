import Beneficiary from '../model/User';
import MedicineBeneficiaryModel from '../model/Medicine_Beneficiary';
import MedicineDonationModel from '../model/Medicine_Donation';

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
        await beneficiary.addMedicinesBeneficiary(medicineBeneficiary);

        const nameMedicine = await MedicineDonationModel.findAll({
          where: {
            name: medicineBeneficiary.name,
          },
          include: [
            {
              model: Beneficiary,
              as: 'donors',
              attributes: ['name', 'phone', 'city'],
            },
          ],
        });

        if (nameMedicine.length > 0) {
          res.status(200).json({ nameMedicine });
        } else {
          res.json({
            message: `Não temos o medicamento ${medicineBeneficiary.name} cadastrado para doação, 
            quando estiver disponível avisaremos você por e-mail.`,
          });
        }
      }
    }
  }
}

export default new MedicineBeneficiary();
