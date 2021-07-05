import ContactDonorModel from '../model/Donation.js';
import MedicineDonationModel from '../model/Medicine_Donation.js';
import ConfirmedDonationBeneficiaryModel from '../model/ConfirmedDonationBeneficiary.js';
import ConfirmsDonorDonationModel from '../model/ConfirmsDonorDonation.js';
import DonorMedicineModel from '../model/Donor_Medicine.js';
import pkg from 'sequelize';
const { Op } = pkg;

class DonationController {
  async setDonation(req, res) {
    console.log('req.body: ', req.body);

    const {
      idDonorMedicine,
      message,
      address,
      nameMedicine,
      quantityDonate,
      date,
      time,
    } = req.body;

    try {
      if (
        idDonorMedicine &&
        message &&
        address &&
        nameMedicine &&
        quantityDonate &&
        date &&
        time
      ) {
        await ContactDonorModel.create(req.body);
        const idMedicine = await DonorMedicineModel.findByPk(idDonorMedicine);

        await MedicineDonationModel.update(
          { status: false },
          { where: { id: idMedicine.idDonationMedicine } }
        );
        res.status(201).json({
          successMessage:
            'Doação agendada com sucesso, o doador será notificado.',
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

  async donorMedicine(req, res) {
    const { user_id } = req.params;

    try {
      const dataDonorMedicine = await DonorMedicineModel.findAll({
        where: {
          [Op.and]: [{ idDonor: user_id }],
        },
      });
      if (dataDonorMedicine.length > 0) {
        res.json({ dataDonorMedicine });
      } else {
        res.json({ message: 'Nenhuma doação agendada' });
      }
    } catch (error) {
      res.json({ error });
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
      } else if (notificationsUser.length <= 0) {
        res.status(202).json({ message: 'Nenhuma Doação Cadastrada.' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async haveDonationScheduledToday(req, res) {
    const { user_id } = req.params;

    const dataBeneficiary = await ContactDonorModel.findAll({
      where: {
        date: new Date(),
        idBeneficiary: user_id,
      },
    });

    if (dataBeneficiary.length > 0) {
      if (dataBeneficiary) {
        res.status(200).json({
          message: 'Beneficiario, hoje você têm uma doação agendada.',
        });
      }
    } else {
      const dataDonation = await ContactDonorModel.findAll({
        where: { date: new Date() },
      });
      const [{ idDonorMedicine }] = dataDonation;
      const donor = await DonorMedicineModel.findByPk(idDonorMedicine);
      const { idDonor } = donor;
      if (idDonor === (await parseInt(user_id))) {
        res
          .status(200)
          .json({ message: 'Doador, hoje você têm uma doação agendada.' });
      }
    }
    res
      .status(200)
      .json({ message: 'Você não têm nenhuma doação agendada para hoje.' });
  }

  async verifyUser(req, res) {
    const { user_id } = req.params;

    const beneficiary = await ContactDonorModel.findAll({
      where: { idBeneficiary: user_id },
    });
    const donor = await ContactDonorModel.findAll({
      where: { idDonor: user_id },
    });

    if (beneficiary.length > 0) {
      const confirmBeneficiary = await ConfirmedDonationBeneficiaryModel.create(
        req.body
      );
      res.status(200).json({
        message: 'Obrigado pela sua confirmação.',
        confirmBeneficiary,
      });
    }
    if (donor.length > 0) {
      const {
        idBeneficiary: idDonor,
        idDonation,
        beneficiaryConfirm: donorConfirm,
      } = req.body;

      const confirmDonor = await ConfirmsDonorDonationModel.create({
        idDonor,
        idDonation,
        donorConfirm,
      });
      res.status(200).json({
        message: 'Obrigado pela sua confirmação doador.',
        confirmDonor,
      });
    }
  }

  async checkDonation(req, res) {
    const { user_id } = req.params;

    try {
      let dataDonation = await ContactDonorModel.findAll({
        where: {
          date: {
            [Op.lt]: new Date(),
          },
          idBeneficiary: user_id,
        },
      });

      if (dataDonation.length > 0) {
        res.status(200).json({ dataDonation });
      } else {
        res
          .status(200)
          .json({ message: 'Voce não têm nenhuma confirmação pedente.' });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new DonationController();
