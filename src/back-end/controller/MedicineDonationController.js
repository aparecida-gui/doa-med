import MedicineDonationModel from '../model/Medicine_Donation.js';
import UserModel from '../model/User.js';
import MedicineBeneficiaryModel from '../model/Medicine_Beneficiary.js';
import sendEmail from '../help/sendEmail.js';

class MedicineDonationController {
  async registerMedicineDonor(req, res) {
    const { donor_id } = req.params;
    const { name, expirationDate, quantity, laboratory, status } = req.body;

    const donor = await UserModel.findByPk(donor_id);

    if (donor) {
      // doador cadastra o medicamento para doação.
      const medicineDonor = await MedicineDonationModel.create({
        name,
        expirationDate,
        quantity,
        laboratory,
        status,
      });

      // adiciona os dados na tabela pivo Donor_Medicine
      // o medoto addAlgumaCoisa não é visivel no sequelize
      const associanteDonor = await donor.addMedicines(medicineDonor);

      if (associanteDonor) {
        // verifica se tem algum beneficiario com interese no
        // medicamento que o doador cadastrou.
        let medicineBeneficiary = await MedicineBeneficiaryModel.findAll({
          where: {
            name: medicineDonor.name,
          },
          include: [
            {
              model: UserModel,
              as: 'beneficiaries',
              attributes: ['name', 'phone', 'city', 'email'],
            },
          ],
        });
        // envia email para o beneficiario que tem interesse
        // no medicamento que o doador cadastrou.
        if (medicineBeneficiary.length > 0) {
          medicineBeneficiary = medicineBeneficiary.map((beneficiary) => {
            return {
              name: beneficiary.beneficiaries[0].name,
              email: beneficiary.beneficiaries[0].email,
            };
          });

          medicineBeneficiary.forEach((element) => {
            sendEmail(element.name, element.email);
          });

          res.status(200).json({
            message:
              'Obrigado por Doar, foi enviado um email para o beneficiario que já tinha interesse no medicamento que você cadastrou.',
          });
        } else {
          res.status(200).json({
            message: 'Obrigado por Doar, medicamento cadastrado com sucesso.',
          });
        }
      } else {
        res
          .status(400)
          .json({ message: 'Não foi possível cadastrar o medicamento.' });
      }
    }
  }
}

export default new MedicineDonationController();
