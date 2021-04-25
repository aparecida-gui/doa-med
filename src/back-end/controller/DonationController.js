import ContactDonorModel from '../model/Donation';
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
      res.status(200).json({ message: 'Hoje você tem uma doação agendada.' });
    }
  }

  // metodo que verifica se a doação aconteceu.
  // pega o id do usuario que está logado.
  // e verifica na tabela de doação se tem
  // o id do usuario como doador ou beneficiario.
  async confirmDonation(req, res) {
    const { user_id } = req.params;

    try {
      const donantionsDatas = await ContactDonorModel.findAll({
        where: {
          date: {
            [Op.lt]: new Date(),
          },
          [Op.or]: [{ idBeneficiary: user_id }, { idDonor: user_id }],
        },
      });
      if (donantionsDatas.length > 0) {
        const dataDonantion = donantionsDatas.map((donantionData) => ({
          name: donantionData.nameMedicine,
          quantity: donantionData.quantityDonate,
          date: donantionData.date,
          time: donantionData.time,
        }));

        res.status(200).json({
          message: 'Este Medicamento foi doado.',
          dataDonantion,
        });
        // id usuario
        // pedir a confirmação ou negação para o usuario.
      } else {
        res.status(200).json({ message: 'Nenhuma confirmação pendente.' });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new DonationController();
