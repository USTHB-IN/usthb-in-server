import mongoose, { model, Schema, Document } from "mongoose";

export enum AcademicYear {
  L1 = "L1",
  L2 = "L2",
  L3 = "L3",
  M1 = "M1",
  M2 = "M2",
}

export interface ISection {
  name: string;
  academicYear: AcademicYear;
  idSpecialite: mongoose.Types.ObjectId;
}

export interface SectionModel extends Document {
  name: string;
  academicYear: AcademicYear;
  idSpecialite: typeof mongoose.Types.ObjectId;
}

const sectionSchema = new Schema<SectionModel>({
  name: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    enum: Object.values(AcademicYear),
    required: true,
  },
  idSpecialite: {
    type: mongoose.Types.ObjectId,
    ref: "Specialite",
    required: true,
  },
});

export default model<SectionModel>("Section", sectionSchema);
