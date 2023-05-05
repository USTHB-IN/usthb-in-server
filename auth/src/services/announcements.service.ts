import Section from "../models/section.model";
import { HttpError } from "middlewares/error.middleware";
import Announcement, {
  IAnnouncement,
  AnnouncementModel,
} from "../models/announcements.model";

export class AnnouncementService {
  static async createAnnouncement(
    announcement: IAnnouncement
  ): Promise<AnnouncementModel> {
    try {
      const existingSection = await Section.findById(announcement.section);
      if (!existingSection) throw new HttpError(404, "Section not found");
      const newAnnouncement = new Announcement({
        title: announcement.title,
        description: announcement.description,
        section: announcement.section,
        date: announcement.date,
      });
      return await newAnnouncement.save();
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAnnouncementById(
    id: string
  ): Promise<AnnouncementModel | null> {
    try {
      const existingAnnouncements = await Announcement.findById(id).populate(
        "section"
      );
      if (!existingAnnouncements)
        throw new HttpError(404, "Announcement not found");
      return existingAnnouncements;
    } catch (error) {
      console.error(`Error getting announcement with id ${id}:`, error);
      throw error;
    }
  }

  static async getAllAnnouncements(): Promise<AnnouncementModel[]> {
    try {
      return await Announcement.find().populate("section");
    } catch (error) {
      console.error("Error getting all announcements:", error);
      throw error;
    }
  }

  static async updateAnnouncement(
    id: string,
    announcement: IAnnouncement
  ): Promise<AnnouncementModel | null> {
    try {
      const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        id,
        {
          title: announcement.title,
          description: announcement.description,
          section: announcement.section,
          date: announcement.date,
        },
        { new: true }
      );
      if (!updatedAnnouncement)
        throw new HttpError(404, "Announcement not found");
      return updatedAnnouncement;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteAnnouncement(
    id: string
  ): Promise<AnnouncementModel | null> {
    try {
      const deletedAnnouncements = await Announcement.findByIdAndDelete(id);
      if (!deletedAnnouncements)
        throw new HttpError(404, "Announcement not found");
      return deletedAnnouncements;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
