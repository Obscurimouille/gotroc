import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { FileRef } from '../../providers/file-reference.js';

const UPLOADS_DIR = 'public/uploads';

const UploadStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // Create directory if it does not exist
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uuid = crypto.randomUUID();
    const extension = path.extname(file.originalname).slice(1);
    const filename = uuid + '.' + extension;
    const absolutePath = path.join(process.cwd(), UPLOADS_DIR, filename);

    if (!Array.isArray(req.context.storage)) req.context.storage = [];
    req.context.storage.push(new FileRef(absolutePath));

    cb(null, filename);
  },
});

export default UploadStorage;
