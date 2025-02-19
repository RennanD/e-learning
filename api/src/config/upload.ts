import { resolve } from 'path';
import { randomBytes } from 'crypto';

import multer from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
