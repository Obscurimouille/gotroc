import multer from 'multer';
import path from 'path';

const UPLOADS_DIR = 'public/uploads';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const uuid = crypto.randomUUID();
    const extension = path.extname(file.originalname).slice(1);
    const filename = uuid + '.' + extension;
    const filepath = `${UPLOADS_DIR}/${filename}`;

    if (!Array.isArray(req.context.storage)) {
      req.context.storage = [];
    }
    req.context.storage.push({
      filename,
      extension,
      path: filepath
    });

    cb(null, filename);
  },
});

const multiUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (_, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .png, .jpg and .jpeg format allowed!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  },
}).fields([
  { name: 'images', maxCount: 5 },
  {
    name: 'title',
  },
  {
    name: 'description',
  },
  {
    name: 'price',
  },
  {
    name: 'subCategoryName',
  },
]);

export default multiUpload;
