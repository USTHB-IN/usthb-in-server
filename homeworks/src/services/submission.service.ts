import { Types } from "mongoose";
import { HttpError } from "../middlewares/error.middleware";
import Submission, {
  ISubmission,
  SubmissionModel,
} from "../models/submission.model";

export class SubmissionService {
  static async createSubmission(
    submission: ISubmission
  ): Promise<SubmissionModel> {
    try {
      const newSubmission = new Submission({
        homework: new Types.ObjectId(submission.homework),
        student: new Types.ObjectId(submission.student),
        fileLink: submission.fileLink,
      });
      await newSubmission.save();
      return newSubmission;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
