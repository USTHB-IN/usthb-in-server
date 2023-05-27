import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { HttpError } from "../middlewares/error.middleware";

// Setup Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL!);

interface UploadImage {
  file: string;
  folder: string;
}

const uploadImage = async (upload: UploadImage): Promise<string> => {
  try {
    const res: UploadApiResponse = await cloudinary.uploader.upload(
      upload.file,
      {
        folder: upload.folder,
        resource_type: "image",
      }
    );
  

    return res.secure_url;
  } catch (error: any) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(500, error.message);
  }
};
export { uploadImage };
