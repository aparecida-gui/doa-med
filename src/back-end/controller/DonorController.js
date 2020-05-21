'use strict';

import DonorModel from '../model/Donor';

class Donor {
  async registerDonor(req, res) {
    const { name, email, phone, city, observations } = req.body;

    if (name !== '' && email !== '' && phone !== '' && city !== '') {
      const donor = await DonorModel.create({
        name,
        email,
        phone,
        city,
        observations,
      });
      res.status(200).json({ donor });
    } else {
      res
        .status(400)
        .json({ message: 'Verifique se todos os campos estão preenchidos.' });
    }
  }
}

export default new Donor();
