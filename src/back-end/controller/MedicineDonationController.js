import MedicineDonationModel from '../model/Medicine_Donation';
import RegisterUserModel from '../model/RegisterUser';

class MedicineDonationController {
  async registerMedicineDonor(req, res) {
    const { donor_id } = req.params;
    const { name, expirationDate, quantity, laboratory } = req.body;

    const donor = await RegisterUserModel.findByPk(donor_id);

    if (donor) {
      const medicineDonor = await MedicineDonationModel.create({
        name,
        expirationDate,
        quantity,
        laboratory,
      });

      console.log('medicineDonor', medicineDonor);

      // adiciona os dados na tabela pivo Donor_Medicine
      // o medoto addAlgumaCoisa não é visivel no sequelize
      const associanteDonor = await donor.addMedicines(medicineDonor);

      if (associanteDonor) {
        res.status(200).json({
          message: `O medicamento ${medicineDonor.name} foi cadastrado com sucesso.`,
        });
      } else {
        res
          .status(400)
          .json({ message: 'Não foi possível cadastrar o medicamento.' });
      }
    }
  }
}

export default new MedicineDonationController();
