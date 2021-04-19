import ContactDonorModel from '../model/Contact_Donor';
import MedicineDonationModel from '../model/Medicine_Donation';
const { Op } = require('sequelize');

class DonationController {
  async setDonation(req, res) {
    const {
      nameBeneficiary,
      idBeneficiary,
      nameDonor,
      idDonor,
      message,
      address,
      idMedicine,
      nameMedicine,
      quantityDonate,
      date,
      time,
    } = req.body;

    try {
      if (
        nameBeneficiary &&
        idBeneficiary &&
        nameDonor &&
        idDonor &&
        message &&
        address &&
        nameMedicine &&
        quantityDonate &&
        date &&
        time
      ) {
        await ContactDonorModel.create(req.body);
        await MedicineDonationModel.update(
          { status: false },
          { where: { id: idMedicine } }
        );
        res.status(201).json({
          successMessage: 'Notificação foi enviada.',
        });
      } else {
        res.status(406).json({
          errorMessage: 'Verifique se todos os campos estão preenchidos.',
        });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getDonation(req, res) {
    const { user_id } = req.params;

    try {
      const notificationsUser = await ContactDonorModel.findAll({
        where: {
          [Op.or]: [{ idBeneficiary: user_id }, { idDonor: user_id }],
        },
      });

      if (notificationsUser) {
        res.status(200).json(notificationsUser);
      } else {
        res.status(202).json({ message: 'Nenhuma Doação Cadastrada.' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async haveDonationScheduledToday(req, res) {
    const { user_id } = req.params;

    let consultaDoação = await ContactDonorModel.findAll({
      where: {
        date: new Date(),
        [Op.or]: [{ idBeneficiary: user_id }, { idDonor: user_id }],
      },
    });
    if (consultaDoação.length > 0) {
      res
        .status(200)
        .json({ message: 'Você tem doação agendada para o dia de hoje.' });
    }
  }
}

export default new DonationController();
