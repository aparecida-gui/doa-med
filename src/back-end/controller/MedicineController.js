'use strict';

import MedicineModel from '../model/MedicineModel';
import moment from 'moment';
import fs from 'fs';
import { Buffer } from 'buffer';

class Medicine {
  async medicineSearch(req, res) {
    try {
      const name = req.params.name;
      if (name) {
        let medicine = await MedicineModel.findAll({
          where: { name },
        });
        if (medicine.length > 0) {
          let photoMedicine = medicine[0]['photo'];

          let photoFormatBuffer = Buffer.from(photoMedicine);
          const imageDB = photoFormatBuffer.toLocaleString();

          const newMedicine = [
            {
              name: medicine[0]['name'],
              expirationDate: medicine[0]['expirationDate'],
              quantity: medicine[0]['quantity'],
              laboratory: medicine[0]['laboratory'],
              iamge: imageDB,
            },
          ];

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
    let photo = req.file;
    photo = photo.filename;

    expirationDate = moment(expirationDate, 'DD-MM-YYYY', true).format();

    console.log('photo', photo);

    if (
      name !== '' &&
      laboratory !== '' &&
      quantity !== '' &&
      expirationDate !== '' &&
      photo !== undefined
    ) {
      const medicine = await MedicineModel.create({
        name,
        laboratory,
        quantity,
        expirationDate,
        photo,
      });
      res.status(200).json({ medicine });
    } else {
      res.status(400).json({
        message: 'Por favor verifique se todos os campos estão preenchidos.',
      });
    }

    res.end();
  }
}

export default new Medicine();
