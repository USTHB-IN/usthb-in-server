import mongoose, { Types, Document, Schema } from "mongoose";

export enum HomeworkType {
  COUR = "Cour",
  TD = "TD",
  TP = "TP",
  EXAMEN = "Examen",
}

export interface IHomework {
  name: string;
  description: string;
  deadline: Date;
  module: string;
  section: string;
  group: string;
  fileLinks: string[];
  submissions: string[];
}

export interface HomeworkModel extends Document {
  name: string;
  description: string;
  deadline: Date;
  module: Types.ObjectId;
  section: Types.ObjectId;
  group: Types.ObjectId;
  fileLinks: string[];
  submissions: string[];
}

const HomeworkSchema = new Schema<HomeworkModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  fileLinks: {
    type: [String],
    default: [],
  },
  submissions: {
    type: [String],
    default: [],
  },
});

export default mongoose.model<HomeworkModel>("Ressource", HomeworkSchema);
