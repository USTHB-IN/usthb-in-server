import { Types } from "mongoose";
import { HttpError } from "../middlewares/error.middleware";
import Ressource, { IHomework, HomeworkModel } from "../models/homework.model";

export class HomeworkService {
  static async createHomework(homework: IHomework): Promise<HomeworkModel> {
    try {
      const newHomework = new Ressource({
        name: homework.name,
        description: homework.description,
        deadline: new Date(homework.deadline),
        module: new Types.ObjectId(homework.module),
        fileLinks: homework.fileLinks,
        submissions: [],
      });
      await newHomework.save();
      return newHomework.populate("module");
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllHomework(): Promise<HomeworkModel[]> {
    try {
      return await Ressource.find()
        .populate("module")
        .populate("section")
        .populate("group")
        .populate("submissions");
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getHomeworkById(id: string): Promise<HomeworkModel> {
    try {
      const existingRessource = await Ressource.findById(id);
      if (!existingRessource) throw new HttpError(404, "Ressource not found");

      return existingRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllHomeworkByModule(
    moduleId: string
  ): Promise<HomeworkModel[]> {
    try {
      const existingRessource = await Ressource.find({
        module: moduleId,
      });
      return existingRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllHomeworkBySection(
    sectionId: string
  ): Promise<HomeworkModel[]> {
    try {
      const existingRessource = await Ressource.find({
        section: sectionId,
      });
      return existingRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllHomeworkByGroup(
    groupId: string
  ): Promise<HomeworkModel[]> {
    try {
      const existingRessource = await Ressource.find({
        group: groupId,
      });
      return existingRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllHomeworkBySectionAndGroup(
    sectionId: string,
    groupId: string
  ): Promise<HomeworkModel[]> {
    try {
      const existingRessource = await Ressource.find({
        section: sectionId,
        group: groupId,
      });
      return existingRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async addSubmission(
    homeworkId: string,
    submissionId: string
  ): Promise<HomeworkModel> {
    try {
      const existingRessource = await Ressource.findById(homeworkId);
      if (!existingRessource) throw new HttpError(404, "Ressource not found");

      existingRessource.submissions.push(submissionId);
      await existingRessource.save();
      return existingRessource.populate("module");
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async editSubmission(
    homeworkId: string,
    submissionId: string,
    newSubmission: string
  ): Promise<HomeworkModel> {
    try {
      const existingRessource = await Ressource.findById(homeworkId);
      if (!existingRessource) throw new HttpError(404, "Ressource not found");

      existingRessource.submissions = existingRessource.submissions.filter(
        (submission) => submission.toString() !== submissionId
      );
      existingRessource.submissions.push(newSubmission);

      await existingRessource.save();
      return existingRessource.populate("module");
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async removeSubmission(
    homeworkId: string,
    submissionId: string
  ): Promise<HomeworkModel> {
    try {
      const existingRessource = await Ressource.findById(homeworkId);
      if (!existingRessource) throw new HttpError(404, "Ressource not found");

      existingRessource.submissions = existingRessource.submissions.filter(
        (submission) => submission.toString() !== submissionId
      );
      await existingRessource.save();
      return existingRessource.populate("module");
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteRessource(id: string): Promise<HomeworkModel> {
    try {
      const deletedRessource = await Ressource.findByIdAndDelete(id);
      if (!deletedRessource) throw new HttpError(404, "Ressource not found");

      return deletedRessource;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
