import MedicineDonationModel from '../model/Medicine_Donation';
import UserModel from '../model/User';

class Medicine {
  async medicineSearch(req, res) {
    try {
      const name = req.params.name;
      if (name) {
        let medicine = await MedicineDonationModel.findAll({
          where: { name },
          include: [
            {
              model: UserModel,
              as: 'donors',
              attributes: ['id', 'name', 'email', 'city'],
            },
          ],
        });

        let data = [];

        medicine.forEach((element) => {
          if (element.dataValues) {
            data.push(element.dataValues);
          }
          return data;
        });

        if (medicine.length > 0) {
          res.status(200).json(data);
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
    let { name, laboratory, quantity, expirationDate } = req.body;

    try {
      if (
        name !== '' &&
        laboratory !== '' &&
        quantity !== '' &&
        expirationDate !== ''
      ) {
        await MedicineDonationModel.create({
          name,
          laboratory,
          quantity,
          expirationDate,
        });
        res.status(201).json({ message: 'Medicamento cadastrado com sucesso' });
      } else {
        res.status(406).json({ error: 'O medicamento não foi cadastrado.' });
      }
    } catch (error) {
      res
        .status(404)
        .json({ error: 'Não foi possível encontrar o conteúdo indicado.' });
    }
  }
}

export default new Medicine();
