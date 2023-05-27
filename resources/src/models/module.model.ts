import mongoose, { Document, Schema, Types } from "mongoose";

export interface IModule {
  name: string;
  specialite: string;
}

export interface ModuleModel extends Document {
  name: string;
  specialite: Types.ObjectId;
}

const ModuleSchema = new Schema<ModuleModel>({
  name: { type: String, required: true },
  specialite: {
    type: Schema.Types.ObjectId,
    ref: "Specialite",
    required: true,
  },
});

export default mongoose.model<ModuleModel>("Module", ModuleSchema);
