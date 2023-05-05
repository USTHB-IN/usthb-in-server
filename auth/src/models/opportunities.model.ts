import mongoose, { Document, Schema } from "mongoose";

enum OpportunityType {
  Internship = "Internship",
  Job = "Job",
  Scholarship = "Scholarship",
  Bootcamp = "Bootcamp",
  Hackathon = "Hackathon",
  Conference = "Conference",
  Workshop = "Workshop",
  Other = "Other",
}

export interface IOpportunity {
  title: string;
  description: string;
  type: OpportunityType;
  image: string;
  link: string;
  club: string;
  clubImage: string;
}

export interface OpportunityDocument extends Document {
  title: string;
  description: string;
  type: OpportunityType;
  image: string;
  link: string;
  club: string;
  clubImage: string;
}

const OpportunitySchema = new Schema<OpportunityDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(OpportunityType),
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
    clubImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<OpportunityDocument>(
  "Opportunity",
  OpportunitySchema
);
