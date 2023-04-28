import Section, {
  SectionModel,
  ISection,
  AcademicYear,
} from "../models/section.model";
import Specialite from "../models/specialite.model";
import { HttpError } from "../middlewares/error.middleware";
import mongoose, { mongo } from "mongoose";
export interface SearchSectionParams {
  name: string;
  academicYear: string;
  nameSpecialite: string;
}

export interface UpdateSectionParams {
  name?: string;
  academicYear?: string;
  nameSpecialite?: string;
}

export interface DeleteSectionParams {
  name: string;
  academicYear: string;
  nameSpecialite: string;
}

export class SectionService {
  static async createSection(
    section: SearchSectionParams
  ): Promise<SectionModel> {
    try {
      const specialite = await Specialite.findOne({
        name: section.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const existingSection = await Section.findOne({
        name: section.name,
        academicYear: section.academicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      });
      if (existingSection) {
        throw new HttpError(409, "Section already exists");
      }
      const newSectionData: ISection = {
        name: section.name,
        academicYear: section.academicYear as AcademicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      };
      const newSection = new Section(newSectionData);
      await newSection.save();
      return newSection;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllSections(): Promise<SectionModel[]> {
    try {
      const section = await Section.find()
        .populate("idSpecialite")
        .populate({
          path: "idSpecialite",
          populate: {
            path: "idFiliere",
            model: "Filiere",
          },
        });
      return section;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getAllSectionsBySpecialite(
    specialiteName: string
  ): Promise<SectionModel[]> {
    try {
      const specialite = await Specialite.findOne({ name: specialiteName });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const section = await Section.find({ idSpecialite: specialite._id });
      return section;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getSectionById(id: string): Promise<SectionModel> {
    try {
      const section = await Section.findById(id);
      if (!section) {
        throw new HttpError(404, "Section not found");
      }

      return section;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getSectionByNameAndNameSpecialite(
    sectionSearch: SearchSectionParams
  ): Promise<SectionModel> {
    try {
      const specialite = await Specialite.findOne({
        name: sectionSearch.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const section = await Section.findOne({
        name: sectionSearch.name,
        academicYear: sectionSearch.academicYear as AcademicYear,
        idSpecialite: specialite._id,
      });
      if (!section) {
        console.log(sectionSearch);

        throw new HttpError(404, "Section not found");
      }

      return section;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateSectionById(
    id: string,
    section: UpdateSectionParams
  ): Promise<SectionModel> {
    try {
      const updatedSection = await Section.findById(id);
      if (!updatedSection) {
        throw new HttpError(404, "Section not found");
      }

      if (section.name) updatedSection.name = section.name;
      if (section.nameSpecialite) {
        const specialite = await Specialite.findOne({ name: section.name });
        if (!specialite) {
          throw new HttpError(404, "Specialite not found");
        }
        updatedSection.idSpecialite = specialite._id;
      }
      if (section.academicYear) {
        updatedSection.academicYear = section.academicYear as AcademicYear;
      }

      await updatedSection.save();
      return updatedSection;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
  static async updateSectionByNameAndNameSpecialite(
    sectionSearch: SearchSectionParams,
    section: UpdateSectionParams
  ): Promise<SectionModel | null> {
    try {
      const specialite = await Specialite.findOne({
        name: sectionSearch.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const updatedSection = await Section.findOne({
        name: sectionSearch.name,
        academicYear: sectionSearch.academicYear as AcademicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      });
      if (!updatedSection) {
        throw new HttpError(404, "Section not found");
      }

      if (section.name) updatedSection.name = section.name;
      if (section.nameSpecialite) {
        const specialite = await Specialite.findOne({
          name: section.nameSpecialite,
        });
        if (!specialite) {
          throw new HttpError(404, "Specialite not found");
        }
        updatedSection.idSpecialite = specialite._id;
      }
      if (section.academicYear) {
        updatedSection.academicYear = section.academicYear as AcademicYear;
      }

      await updatedSection.save();
      return updatedSection;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteSectionById(id: string): Promise<SectionModel | null> {
    try {
      const deletedSection = await Section.findByIdAndDelete(id);
      if (!deletedSection) {
        throw new HttpError(404, "Section not found");
      }

      return deletedSection;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteSectionByName(
    section: DeleteSectionParams
  ): Promise<SectionModel | null> {
    try {
      const specialite = await Specialite.findOne({
        name: section.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const deletedSection = await Section.findOneAndDelete({
        name: section.name,
        academicYear: section.academicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      });
      if (!deletedSection) {
        throw new HttpError(404, "Section not found");
      }
      return deletedSection;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
