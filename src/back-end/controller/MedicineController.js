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

  async registerMedicine(req, res, next) {
    let { name, laboratory, quantity, expirationDate } = req.body;
    const { user_id } = req.params;
    const donor = await User.findByPk(user_id);

    try {
      if (donor === null || typeof donor === 'undefined') {
        res.status(401).json({ messageError: 'Usuário não cadastrado.' });
      } else {
        if (
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
          return res
            .status(200)
            .json({ message: 'medicamento cadastrado com sucesso' });
        }
        next();
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new Medicine();
