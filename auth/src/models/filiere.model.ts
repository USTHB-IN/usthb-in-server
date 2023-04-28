import mongoose, { Schema, Document } from "mongoose";

export interface IFiliere {
  name: string;
  abbreviation: string;
}

export interface FiliereModel extends Document {
  name: string;
  abbreviation: string;
}

const FiliereSchema: Schema = new Schema<FiliereModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  abbreviation: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<FiliereModel>("Filiere", FiliereSchema);
