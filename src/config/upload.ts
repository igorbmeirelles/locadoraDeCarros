import multer from "multer";
import { resolve } from "path";
import { randomBytes } from "crypto";

const tmpFolder = resolve(__dirname, "..", "..", "temp");

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      const fileHash = randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return cb(null, filename);
    },
  }),
};
