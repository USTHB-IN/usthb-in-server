import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFile {
  name: string;
  url: string;
  solution?: string;
}

export interface FileModel extends Document {
  name: string;
  url: string;
  solution?: string;
}

const FileSchema = new Schema<FileModel>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  solution: {
    type: String,
  },
});

export default mongoose.model<FileModel>("File", FileSchema);
