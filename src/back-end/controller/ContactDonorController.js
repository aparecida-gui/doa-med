import ContactDonorModel from '../model/Contact_Donor';

class ContactDonorController {
  async messageNotification(req, res) {
    console.log('>>>>> req.body: ', req.body);
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
}

export default new ContactDonorController();
