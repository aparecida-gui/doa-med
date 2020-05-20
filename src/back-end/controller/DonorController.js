'use strict';

import DonorModel from '../model/DonorModel';

class Donor {
  async registerDonor(req, res) {
    const { name, email, phone, observations } = req.body;

    if (name !== '' && email !== '' && phone !== '' && observations !== '') {
      const donor = await DonorModel.create({
        name,
        email,
        phone,
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
