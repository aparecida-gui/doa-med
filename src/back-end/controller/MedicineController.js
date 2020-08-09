'use strict';

import MedicineDonationModel from '../model/Medicine_Donation';
import User from '../model/RegisterUser';
import moment from 'moment';

class Medicine {
  async medicineSearch(req, res) {
    try {
      const name = req.params.name;
      if (name) {
        let medicine = await MedicineDonationModel.findAll({
          where: { name },
        });
        if (medicine.length > 0) {
          res.status(200).json({ medicine });
        } else {
          res.status(200).json({
            message: `${name} não tem cadastro para doação.`,
          });
        }
      }
    } catch (error) {
      res.status(400).json(error);
    }
    res.end();
  }

  async registerMedicine(req, res) {
    const { user_id } = req.params;
    let { name, laboratory, quantity, expirationDate } = req.body;

    try {
      const donor = await User.findByPk(user_id);

      if (
        donor &&
        name !== '' &&
        laboratory !== '' &&
        quantity !== '' &&
        expirationDate !== ''
      ) {
        expirationDate = moment(expirationDate, 'DD-MM-YYYY', true).format();
        const medicine = await MedicineDonationModel.create({
          name,
          expirationDate,
          quantity,
          laboratory,
        });
        await donor.addMedicine(medicine);
        res.status(200).json({ message: 'medicamento cadastrado com sucesso' });
      } else {
        res.status(400).json({ messageError: 'Usuário não cadastrado.' });
      }
    } catch (error) {}
  }
}

export default new Medicine();
