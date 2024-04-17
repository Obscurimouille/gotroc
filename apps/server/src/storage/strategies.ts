import multer from "multer";
import UploadStorage from "./disk/upload.js";
import { ImageFilter } from "./filters/image.js";

export const AvatarUploadStrategy = multer({
  storage: UploadStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: ImageFilter,
});

export const OfferImageUploadStrategy = multer({
  storage: UploadStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: ImageFilter,
});