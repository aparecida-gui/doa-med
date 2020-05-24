import PhotoModel from '../model/Photo';
import MedicineBeneficiaryModel from '../model/Medicine_Beneficiary';

class Photo {
  async AddPhoto(req, res) {
    const { medicine_beneficiary_id } = req.params;
    const medidine = await MedicineBeneficiaryModel.findByPk(
      medicine_beneficiary_id
    );

    if (medidine) {
      const createPhoto = await PhotoModel.create({
        name: req.file.filename,
        medicine_beneficiary_id,
      });
      console.log('>>>>>>>>>>');
      if (createPhoto.get()) {
        res
          .status(200)
          .json({ message: 'imagem da receita adicionada com sucesso.' });
      }
    } else {
      res
        .status(400)
        .json({ message: 'O medicamento indicado não possui cadastro.' });
    }
  }
}

export default new Photo();
