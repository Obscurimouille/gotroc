import { Request } from 'express';
import { FileFilterCallback } from 'multer';

export const ImageFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
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
};
