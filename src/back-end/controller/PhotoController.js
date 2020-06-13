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

  async showPhoto(req, res) {
    const photo = await PhotoModel.findAll({
      include: [
        { model: MedicineBeneficiaryModel, as: 'medicine_beneficiary' },
      ],
    });

    let imageMedicalPrescription = photo.map(function (photos) {
      return [
        {
          image: photos.name.toString(),
          name: photos.medicine_beneficiary.name,
          quantity: photos.medicine_beneficiary.quantity,
        },
      ];
    });

    res.status(200).json({ imageMedicalPrescription });
  }
}

export default new Photo();
