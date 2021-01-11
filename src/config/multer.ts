import { diskStorage } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const destination = resolve(__dirname, '..', '..', 'tmp');

export default {
  destination,
  storage: diskStorage({
    destination,
    filename(_, file, cb) {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
