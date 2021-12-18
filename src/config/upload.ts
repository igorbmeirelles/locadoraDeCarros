import multer from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (req, file, cb) => {
          const fileHash = randomBytes(16).toString('hex');
          const filename = `${fileHash}-${file.originalname}`;

          return cb(null, filename);
        }
      })
    }
  }
}
