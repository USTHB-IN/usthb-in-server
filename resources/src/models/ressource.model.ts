import mongoose, { Types, Document, Schema } from "mongoose";

export enum ResourceType {
  COUR = "Cour",
  TD = "TD",
  TP = "TP",
  EXAMEN = "Examen",
}

export interface IRessource {
  name: string;
  type: ResourceType;
  date: Date;
  module: string;
  file: string;
}

export interface RessourceModel extends Document {
  name: string;
  type: ResourceType;
  date: Date;
  module: Types.ObjectId;
  file: Types.ObjectId;
}

const RessourceSchema = new Schema<RessourceModel>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(ResourceType),
    required: true,
  },
  date: {
    type: Date,
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: "module",
    required: true,
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: "file",
    required: true,
  },
});

export default mongoose.model<RessourceModel>("Ressource", RessourceSchema);
