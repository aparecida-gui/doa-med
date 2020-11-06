import Beneficiary from '../model/RegisterUser';
import Medicine_Beneficiary from '../model/Medicine_Beneficiary';

class ViewRegisteredMedications {
  async showData(req, res) {
    const { beneficiary_id } = req.params;
    const beneficiary = await Beneficiary.findByPk(beneficiary_id);

    if (beneficiary) {
      const dados = await Beneficiary.findByPk(beneficiary_id, {
        attributes: ['name', 'email', 'phone', 'city'],
        include: [
          {
            model: Medicine_Beneficiary,
            as: 'medicinesBeneficiary',
            attributes: ['id', 'name', 'quantity', 'prescription'],
          },
        ],
      });
      if (dados.medicinesBeneficiary.length > 0) {
        res.status(200).json({ dados });
      } else {
        const user = await Beneficiary.findByPk(beneficiary_id, {
          attributes: ['name', 'email', 'phone', 'city'],
        });
        res
          .status(200)
          .json({ user, message: 'Você não possui medicamentos cadastrados.' });
      }
    } else {
      res.status(403).json({ messageError: 'Usuario não existe.' });
    }
  }
}

export default new ViewRegisteredMedications();
