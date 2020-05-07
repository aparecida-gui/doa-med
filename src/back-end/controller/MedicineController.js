import MedicineModel from '../model/MedicineModel';
import MedicineValidade from '../MedicineValidade';

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
        }
        return res.status(200).json({
          message: `${name} não tem cadastro para doação.`,
        });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async registerMedicine(req, res) {
    const { name, quantity, laboratory, photo } = req.body;

    if (name && quantity && laboratory) {
      const medicine = await MedicineModel.create({
        name,
        quantity,
        laboratory,
        photo,
      });
      return res.status(200).json({ medicine });
    }
    return res.status(400).json({
      message: 'verifique se todos os campos estão preenchidos corretamente.',
    });
  }
}

export default new Medicine();
