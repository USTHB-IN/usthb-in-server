import { UploadedFile } from "express-fileupload";
import { HttpError } from "../middlewares/error.middleware";
import Opportunity, {
  IOpportunity,
  OpportunityDocument,
} from "../models/opportunities.model";

import { uploadImage } from "../utils/uploadImage";

export class OpportunityService {
  static async createOpportunity(
    opportunity: IOpportunity
  ): Promise<OpportunityDocument> {
    try {
      console.log(opportunity);

      const image = uploadImage({
        image: opportunity.image,
        folder: "opportunities",
      });

      const clubImage = uploadImage({
        image: opportunity.clubImage,
        folder: "clubs",
      });
      const newOpportunity = new Opportunity({
        title: opportunity.title,
        description: opportunity.description,
        type: opportunity.type,
        image: image,
        link: opportunity.link,
        club: opportunity.club,
        clubImage: clubImage,
      });
      return await newOpportunity.save();
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getOpportunityById(
    id: string
  ): Promise<OpportunityDocument | null> {
    try {
      const existingOpportunity = await Opportunity.findById(id);
      if (!existingOpportunity)
        throw new HttpError(404, "Opportunity not found");
      return existingOpportunity;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllOpportunities(): Promise<OpportunityDocument[]> {
    try {
      return await Opportunity.find();
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateOpportunity(
    id: string,
    opportunity: IOpportunity
  ): Promise<OpportunityDocument | null> {
    try {
      const updatedOpportunity = await Opportunity.findByIdAndUpdate(
        id,
        {
          title: opportunity.title,
          description: opportunity.description,
          type: opportunity.type,
          image: opportunity.image,
          link: opportunity.link,
          club: opportunity.club,
          clubImage: opportunity.clubImage,
        },
        { new: true }
      );
      if (!updatedOpportunity)
        throw new HttpError(404, "Opportunity not found");
      return updatedOpportunity;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteOpportunity(id: string): Promise<OpportunityDocument> {
    try {
      const deletedOpportunity = await Opportunity.findByIdAndDelete(id);
      if (!deletedOpportunity)
        throw new HttpError(404, "Opportunity not found");
      return deletedOpportunity;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
