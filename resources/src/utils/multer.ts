import multer from "multer";

interface UploaderConfig {
  folder: string;
}

export const uploader = ({ folder }: UploaderConfig): multer.Multer => {
  // Multer configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Set the destination folder for uploaded files
      cb(null, `src/uploads/`);
    },
    filename: function (req, file, cb) {
      // Set the filename for uploaded files
      cb(null, `${folder}` + "-" + file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
  });
  return upload;
};
