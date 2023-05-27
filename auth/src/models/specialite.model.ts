import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISpecialite {
  name: string;
  abbreviation: string;
  idFiliere: mongoose.Types.ObjectId;
}

export interface SpecialiteModel extends Document {
  name: string;
  abbreviation: string;
  idFiliere: Types.ObjectId;
}

const SpecialiteSchema: Schema = new Schema<SpecialiteModel>({
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
  idFiliere: {
    type: Schema.Types.ObjectId,
    ref: "Filiere",
    require: true,
  },
});

export default mongoose.model<SpecialiteModel>("Specialite", SpecialiteSchema);
