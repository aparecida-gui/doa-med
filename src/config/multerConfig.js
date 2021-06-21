import multer from 'multer';
import path from 'path';

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cd) => {
      cd(null, Date.now().toString() + '--' + file.originalname);
    },
  }),
};

export default multerConfig;
