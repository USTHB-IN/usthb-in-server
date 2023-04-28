import Groupe, { GroupeModel, GroupType } from "../models/group.model";
import Specialite from "../models/specialite.model";
import Section from "../models/section.model";
import { HttpError } from "../middlewares/error.middleware";
import mongoose from "mongoose";

export interface CreateGroupParams {
  name: string;
  type: string;
  nameSection: string;
  academicYear: string;
  nameSpecialite: string;
}

export interface SearchGroupsBySectionParams {
  nameSection: string;
  academicYear: string;
  nameSpecialite: string;
}

export interface SearchGroupByNameType {
  name: string;
  type: string;
}

export interface UpdateGroupParams {
  name?: string;
  type?: GroupType;
  nameSection?: string;
  academicYear?: string;
  nameSpecialite?: string;
}

export interface SearchGroupParams {
  name: string;
  type: string;
  nameSection: string;
  academicYear: string;
  nameSpecialite: string;
}

export class GroupService {
  static async createGroup(group: CreateGroupParams): Promise<GroupeModel> {
    try {
      const specialite = await Specialite.findOne({
        name: group.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const section = await Section.findOne({
        name: group.nameSection,
        academicYear: group.academicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      });
      if (!section) {
        throw new HttpError(404, "Section not found");
      }

      const groupExist = await Groupe.findOne({
        name: group.name,
        idSection: section._id,
      });
      if (groupExist) {
        throw new HttpError(409, "Group already exist");
      }

      const newGroup = new Groupe({
        name: group.name,
        type: group.type as GroupType,
        idSection: section._id as mongoose.Types.ObjectId,
      });

      await newGroup.save();
      return newGroup;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllGroups(): Promise<GroupeModel[]> {
    try {
      const groups = await Groupe.find();
      return groups;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getAllGroupsBySection(
    section: SearchGroupsBySectionParams
  ): Promise<GroupeModel[]> {
    try {
      const specialite = await Specialite.findOne({
        name: section.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const sectionFound = await Section.findOne({
        name: section.nameSection,
        academicYear: section.academicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      });
      if (!sectionFound) {
        throw new HttpError(404, "Section not found");
      }

      const groups = await Groupe.find({
        idSection: sectionFound._id as mongoose.Types.ObjectId,
      });
      return groups;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getGroupById(id: string): Promise<GroupeModel> {
    try {
      const group = await Groupe.findById(id);
      if (!group) {
        throw new HttpError(404, "Group not found");
      }
      return group;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getGroupByNameAndSection(
    searchGroup: SearchGroupParams
  ): Promise<GroupeModel> {
    try {
      const specialite = await Specialite.findOne({
        name: searchGroup.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const section = await Section.findOne({
        name: searchGroup.nameSection,
        academicYear: searchGroup.academicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      });
      if (!section) {
        throw new HttpError(404, "Section not found");
      }

      const group = await Groupe.findOne({
        name: searchGroup.name,
        type: searchGroup.type as GroupType,
        idSection: section._id as mongoose.Types.ObjectId,
      });
      if (!group) {
        throw new HttpError(404, "Group not found");
      }
      return group;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateGroupById(
    id: string,
    group: UpdateGroupParams
  ): Promise<GroupeModel | null> {
    try {
      const updatedGroup = await Groupe.findById(id);
      if (!updatedGroup) {
        throw new HttpError(404, "Group not found");
      }

      if (group.name) updatedGroup.name = group.name;
      if (group.type) updatedGroup.type = group.type;
      if (group.nameSpecialite && group.academicYear && group.nameSection) {
        const specialite = await Specialite.findOne({
          name: group.nameSpecialite,
        });
        if (!specialite) {
          throw new HttpError(404, "Specialite not found");
        }
        const section = await Section.findOne({
          name: group.nameSection,
          academicYear: group.academicYear,
          idSpecialite: specialite._id as mongoose.Types.ObjectId,
        });
        if (!section) {
          throw new HttpError(404, "Section not found");
        }

        updatedGroup.idSection = section._id;
      }

      await updatedGroup.save();
      return updatedGroup;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateGroupByNameAndSection(
    searchGroup: SearchGroupParams,
    group: UpdateGroupParams
  ): Promise<GroupeModel | null> {
    try {
      const specialite = await Specialite.findOne({
        name: searchGroup.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const section = await Section.findOne({
        name: searchGroup.nameSection,
        academicYear: searchGroup.academicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      });
      if (!section) {
        throw new HttpError(404, "Section not found");
      }

      const updatedGroup = await Groupe.findOne({
        name: searchGroup.name,
        type: searchGroup.type as GroupType,
        idSection: section._id as mongoose.Types.ObjectId,
      });
      if (!updatedGroup) {
        throw new HttpError(404, "Group not found");
      }

      if (group.name) updatedGroup.name = group.name;
      if (group.type) updatedGroup.type = group.type;
      if (group.nameSpecialite && group.academicYear && group.nameSection) {
        const specialite = await Specialite.findOne({
          name: group.nameSpecialite,
        });
        if (!specialite) {
          throw new HttpError(404, "Specialite not found");
        }
        const section = await Section.findOne({
          name: group.nameSection,
          academicYear: group.academicYear,
          idSpecialite: specialite._id as mongoose.Types.ObjectId,
        });
        if (!section) {
          throw new HttpError(404, "Section not found");
        }

        updatedGroup.idSection = section._id;
      }

      await updatedGroup.save();
      return updatedGroup;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteGroupById(id: string): Promise<GroupeModel | null> {
    try {
      const deletedGroup = await Groupe.findByIdAndDelete(id);
      if (!deletedGroup) {
        throw new HttpError(404, "Group not found");
      }

      return deletedGroup;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteGroupByNameAndSection(
    searchGroup: SearchGroupParams
  ): Promise<GroupeModel | null> {
    try {
      const specialite = await Specialite.findOne({
        name: searchGroup.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const section = await Section.findOne({
        name: searchGroup.nameSection,
        academicYear: searchGroup.academicYear,
        idSpecialite: specialite._id as mongoose.Types.ObjectId,
      });
      if (!section) {
        throw new HttpError(404, "Section not found");
      }

      const deletedGroup = await Groupe.findOneAndDelete({
        name: searchGroup.name,
        type: searchGroup.type as GroupType,
        idSection: section._id as mongoose.Types.ObjectId,
      });

      return deletedGroup;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
