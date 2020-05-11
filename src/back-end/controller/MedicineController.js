'use strict';

import MedicineModel from '../model/MedicineModel';
import moment from 'moment';

class Medicine {
  async medicineSearch(req, res) {
    try {
      const name = req.params.name;
      if (name) {
        const medicine = await MedicineModel.findAll({
          where: { name },
        });
        if (medicine.length > 0) {
          return res.status(200).json({ medicine });
        } else {
          return res.status(200).json({
            message: `${name} não tem cadastro para doação.`,
          });
        }
      }
      res.end();
    } catch (error) {
      res.status(400).json({ message: error });
      res.end();
    }
  }

  async registerMedicine(req, res) {
    let { name, laboratory, quantity, expirationDate, photo } = req.body;

    expirationDate = moment(expirationDate, 'DD-MM-YYYY', true).format();

    try {
      if (expirationDate === 'Invalid date') {
        res.status(400).json({
          message: 'O campo data está com o valor inválido.',
        });
      } else {
        const medicine = await MedicineModel.create({
          name,
          laboratory,
          quantity,
          expirationDate,
          photo,
        });

        res.status(200).json({ medicine });
      }
    } catch (error) {
      res, status(400).json({ message: error });
    }

    res.end();
  }
}

export default new Medicine();
