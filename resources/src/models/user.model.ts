import mongoose, { Document, Model, Schema, ObjectId, Types } from "mongoose";

export interface IUser {
  matricule: string;
  prenom: string;
  nom: string;
  birthday: Date;
  email: string;
  password: string;
  section: mongoose.Types.ObjectId[];
  group: mongoose.Types.ObjectId[];
}

export interface UserModel extends Document {
  matricule: string;
  prenom: string;
  nom: string;
  birthday: Date;
  email: string;
  password: string;
  section: Types.ObjectId[];
  group: Types.ObjectId[];
}

const userSchema: Schema = new Schema<UserModel>(
  {
    matricule: {
      type: String,
      required: true,
      unique: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    section: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
      },
    ],
    group: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<UserModel>("User", userSchema);
