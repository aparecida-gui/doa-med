'use strict';

import MedicineDonationModel from '../model/Medicine_Donation';
import DonorModel from '../model/Donor';
import moment from 'moment';
import fs from 'fs';
import { Buffer } from 'buffer';

class Medicine {
  async medicineSearch(req, res) {
    try {
      const name = req.params.name;
      if (name) {
        let medicine = await MedicineDonationModel.findAll({
          where: { name },
        });
        if (medicine.length > 0) {
          // let photoMedicine = medicine[0]['photo'];

          // let photoFormatBuffer = Buffer.from(photoMedicine);
          // const imageDB = photoFormatBuffer.toLocaleString();

          // const newMedicine = [
          //   {
          //     name: medicine[0]['name'],
          //     expirationDate: medicine[0]['expirationDate'],
          //     quantity: medicine[0]['quantity'],
          //     laboratory: medicine[0]['laboratory'],
          //     iamge: imageDB,
          //   },
          // ];

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
    const { donor_id } = req.params;
    let { name, laboratory, quantity, expirationDate } = req.body;

    let donor = await DonorModel.findByPk(donor_id);

    if (!donor) {
      res
        .status(400)
        .json({ message: 'Não foi encontrado o usuário indicado.' });
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
        res.status(200).json({ message: 'medicamento cadastrado com sucesso' });
      }
    }

    res.end();
  }
}

export default new Medicine();
