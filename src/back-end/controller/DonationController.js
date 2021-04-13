import ContactDonorModel from '../model/Contact_Donor';

class DonationController {
  async setDonation(req, res) {
    const {
      nameBeneficiary,
      idBeneficiary,
      nameDonor,
      idDonor,
      message,
      address,
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
        res.status(201).json({
          successMessage: `Notificação foi enviada.`,
        });
      } else {
        res.status(406).json({
          errorMessage: 'Verifique se todos os campos estão preenchidos.',
        });
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getDonation(req, res) {
    const { user_id } = req.params;

    try {
      const notificationsUser = await ContactDonorModel.findByPk(user_id);

      if (notificationsUser) {
        res.status(200).json(notificationsUser);
      } else {
        res.status(202).json({ message: 'Nenhuma Doação Cadastrada.' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new DonationController();
