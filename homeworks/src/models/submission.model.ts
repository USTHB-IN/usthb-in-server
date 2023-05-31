import mongoose, { Types, Document, Schema } from "mongoose";

export interface ISubmission {
  homework: string;
  student: string;
  fileLink: string[];
}

export interface SubmissionModel extends Document {
  homework: Types.ObjectId;
  student: Types.ObjectId;
  fileLink: string[];
}

const SubmissionSchema = new Schema<SubmissionModel>({
  homework: {
    type: Schema.Types.ObjectId,
    ref: "Homework",
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileLink: {
    type: [String],
    default: [],
  },
});

export default mongoose.model<SubmissionModel>("Submission", SubmissionSchema);
