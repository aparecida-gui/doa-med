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
            attributes: ['name', 'quantity', 'prescription'],
          },
        ],
      });
      res.status(200).json({ dados });
    } else {
      res.status(400).json({ MessageError: 'Usuario não existe.' });
    }
  }
}

export default new ViewRegisteredMedications();
