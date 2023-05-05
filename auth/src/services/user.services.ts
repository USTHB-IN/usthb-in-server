import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { HttpError } from "../middlewares/error.middleware";
import User, { UserModel } from "../models/user.model";
import Specialite from "../models/specialite.model";
import Section from "../models/section.model";
import { SearchGroupParams } from "./groupe.service";
import Group from "../models/group.model";
import { SearchSectionParams } from "./section.service";

export interface CreateUserParams {
  matricule: string;
  prenom: string;
  nom: string;
  birthday: Date;
  email: string;
  password: string;
  section: SearchSectionParams[];
  group: SearchGroupParams[];
}

export interface UpdateUserParams {
  matricule?: string;
  prenom?: string;
  nom?: string;
  birthday?: Date;
  email?: string;
  password?: string;
  section?: SearchSectionParams[];
  group?: SearchGroupParams[];
}
export class UserService {
  static async createUser(user: CreateUserParams): Promise<UserModel> {
    try {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        throw new HttpError(409, "User already exists");
      }

      if (!user.email.endsWith("usthb.dz"))
        throw new HttpError(409, "Email must end with usthb.dz");

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);

      const userSection: Types.ObjectId[] = [];
      const userGroups: Types.ObjectId[] = [];
      user.section.forEach(async (sectionData) => {
        const specialite = await Specialite.findOne({
          name: sectionData.nameSpecialite,
        });
        if (!specialite) {
          throw new HttpError(404, "Specialite not found");
        }

        const section = await Section.findOne({
          name: sectionData.name,
          academicYear: sectionData.academicYear,
          idSpecialite: specialite._id as Types.ObjectId,
        });
        if (!section) {
          throw new HttpError(404, "Section not found");
        }
        userSection.push(section._id as Types.ObjectId);
      });

      user.group.forEach(async (groupData) => {
        const specialite = await Specialite.findOne({
          name: groupData.nameSpecialite,
        });
        if (!specialite) {
          throw new HttpError(404, "Specialite not found");
        }

        const section = await Section.findOne({
          name: groupData.nameSection,
          academicYear: groupData.academicYear,
          idSpecialite: specialite._id as Types.ObjectId,
        });
        if (!section) {
          throw new HttpError(404, "Section not found");
        }

        const groupTd = await Group.findOne({
          name: groupData.name,
          type: groupData.type,
          idSection: section._id as Types.ObjectId,
        });
        if (!groupTd) {
          throw new HttpError(404, "Group not found");
        }

        userGroups.push(groupTd._id as Types.ObjectId);
      });

      const newUser = new User({
        matricule: user.matricule,
        prenom: user.prenom,
        nom: user.nom,
        birthday: user.birthday,
        email: user.email,
        password: hashedPassword,
        section: userSection,
        group: userGroups,
      });

      await newUser.save();
      return newUser;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getUserById(id: string): Promise<UserModel> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new HttpError(404, "User not found");
      }
      return user;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getUserByEmail(email: string): Promise<UserModel> {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new HttpError(404, "User not found");
      }
      return user;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getUserByMatricule(matricule: string): Promise<UserModel> {
    try {
      const user = await User.findOne({ matricule: matricule });
      if (!user) {
        throw new HttpError(404, "User not found");
      }

      return user;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async getAllUsers(): Promise<UserModel[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getAllUsersBySectionId(id: string): Promise<UserModel[]> {
    try {
      const users = await User.find({ section: { $in: id } });
      return users;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getAllUsersBySection(
    section: SearchSectionParams
  ): Promise<UserModel[]> {
    try {
      const specialite = await Specialite.findOne({
        name: section.nameSpecialite,
      });
      if (!specialite) {
        throw new HttpError(404, "Specialite not found");
      }

      const sectionSearch = await Section.findOne({
        name: section.name,
        academicYear: section.academicYear,
        idSpecialite: specialite._id as Types.ObjectId,
      });
      if (!sectionSearch) {
        throw new HttpError(404, "Section not found");
      }

      const users = await User.find({ section: { $in: sectionSearch._id } });
      return users;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getAllUsersByGroupId(id: string): Promise<UserModel[]> {
    try {
      const users = await User.find({ group: { $in: id } });
      return users;
    } catch (error: any) {
      throw new HttpError(500, error.message);
    }
  }

  static async getAllUsersByGroup(
    group: SearchGroupParams
  ): Promise<UserModel[]> {
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
        idSpecialite: specialite._id as Types.ObjectId,
      });
      if (!section) {
        throw new HttpError(404, "Section not found");
      }

      const groupSearch = await Group.findOne({
        name: group.name,
        type: group.type,
        idSection: section._id as Types.ObjectId,
      });
      if (!groupSearch) {
        throw new HttpError(404, "Group not found");
      }

      const users = await User.find({ group: { $in: groupSearch._id } });
      return users;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateUserById(
    id: string,
    updateUser: UpdateUserParams
  ): Promise<UserModel> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new HttpError(404, "User not found");
      }

      if (updateUser.matricule) user.matricule = updateUser.matricule;
      if (updateUser.prenom) user.prenom = updateUser.prenom;
      if (updateUser.nom) user.nom = updateUser.nom;
      if (updateUser.birthday) user.birthday = updateUser.birthday;
      if (updateUser.email) user.email = updateUser.email;
      if (updateUser.password) user.password = updateUser.password;
      if (updateUser.section) {
        const userSection: Types.ObjectId[] = [];
        updateUser.section.forEach(async (sectionDate) => {
          const specialite = await Specialite.findOne({
            name: sectionDate.nameSpecialite,
          });
          if (!specialite) {
            throw new HttpError(404, "Specialite not found");
          }

          const section = await Section.findOne({
            name: sectionDate.name,
            academicYear: sectionDate.academicYear,
            idSpecialite: specialite._id as Types.ObjectId,
          });
          if (!section) {
            throw new HttpError(404, "Section not found");
          }
          userSection.push(section._id as Types.ObjectId);
        });

        user.section = userSection;
      }
      if (updateUser.group) {
        const userGroups: Types.ObjectId[] = [];
        updateUser.group.forEach(async (group) => {
          const specialite = await Specialite.findOne({
            name: group.nameSpecialite,
          });
          if (!specialite) {
            throw new HttpError(404, "Specialite not found");
          }

          const section = await Section.findOne({
            name: group.nameSection,
            academicYear: group.academicYear,
            idSpecialite: specialite._id as Types.ObjectId,
          });
          if (!section) {
            throw new HttpError(404, "Section not found");
          }

          const groupTd = await Group.findOne({
            name: group.name,
            type: group.type,
            idSection: section._id as Types.ObjectId,
          });
          if (!groupTd) {
            throw new HttpError(404, "Group not found");
          }

          userGroups.push(groupTd._id as Types.ObjectId);
        });
        user.group = userGroups;
      }

      await user.save();
      return user;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateUserByEmail(
    email: string,
    updateUser: UpdateUserParams
  ): Promise<UserModel> {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new HttpError(404, "User not found");
      }

      if (updateUser.matricule) user.matricule = updateUser.matricule;
      if (updateUser.prenom) user.prenom = updateUser.prenom;
      if (updateUser.nom) user.nom = updateUser.nom;
      if (updateUser.birthday) user.birthday = updateUser.birthday;
      if (updateUser.email) user.email = updateUser.email;
      if (updateUser.password) user.password = updateUser.password;
      if (updateUser.section) {
        const userSection: Types.ObjectId[] = [];
        updateUser.section.forEach(async (sectionDate) => {
          const specialite = await Specialite.findOne({
            name: sectionDate.nameSpecialite,
          });
          if (!specialite) {
            throw new HttpError(404, "Specialite not found");
          }

          const section = await Section.findOne({
            name: sectionDate.name,
            academicYear: sectionDate.academicYear,
            idSpecialite: specialite._id as Types.ObjectId,
          });
          if (!section) {
            throw new HttpError(404, "Section not found");
          }
          userSection.push(section._id as Types.ObjectId);
        });

        user.section = userSection;
      }
      if (updateUser.group) {
        const userGroups: Types.ObjectId[] = [];
        updateUser.group.forEach(async (group) => {
          const specialite = await Specialite.findOne({
            name: group.nameSpecialite,
          });
          if (!specialite) {
            throw new HttpError(404, "Specialite not found");
          }

          const section = await Section.findOne({
            name: group.nameSection,
            academicYear: group.academicYear,
            idSpecialite: specialite._id as Types.ObjectId,
          });
          if (!section) {
            throw new HttpError(404, "Section not found");
          }

          const groupTd = await Group.findOne({
            name: group.name,
            type: group.type,
            idSection: section._id as Types.ObjectId,
          });
          if (!groupTd) {
            throw new HttpError(404, "Group not found");
          }

          userGroups.push(groupTd._id as Types.ObjectId);
        });
        user.group = userGroups;
      }

      await user.save();
      return user;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async updateUserByMatricule(
    matricule: string,
    updateUser: UpdateUserParams
  ): Promise<UserModel> {
    try {
      const user = await User.findOne({ matricule: matricule });
      if (!user) {
        throw new HttpError(404, "User not found");
      }

      if (updateUser.matricule) user.matricule = updateUser.matricule;
      if (updateUser.prenom) user.prenom = updateUser.prenom;
      if (updateUser.nom) user.nom = updateUser.nom;
      if (updateUser.birthday) user.birthday = updateUser.birthday;
      if (updateUser.email) user.email = updateUser.email;
      if (updateUser.password) user.password = updateUser.password;
      if (updateUser.section) {
        const userSection: Types.ObjectId[] = [];
        updateUser.section.forEach(async (sectionDate) => {
          const specialite = await Specialite.findOne({
            name: sectionDate.nameSpecialite,
          });
          if (!specialite) {
            throw new HttpError(404, "Specialite not found");
          }

          const section = await Section.findOne({
            name: sectionDate.name,
            academicYear: sectionDate.academicYear,
            idSpecialite: specialite._id as Types.ObjectId,
          });
          if (!section) {
            throw new HttpError(404, "Section not found");
          }
          userSection.push(section._id as Types.ObjectId);
        });

        user.section = userSection;
      }
      if (updateUser.group) {
        const userGroups: Types.ObjectId[] = [];
        updateUser.group.forEach(async (group) => {
          const specialite = await Specialite.findOne({
            name: group.nameSpecialite,
          });
          if (!specialite) {
            throw new HttpError(404, "Specialite not found");
          }

          const section = await Section.findOne({
            name: group.nameSection,
            academicYear: group.academicYear,
            idSpecialite: specialite._id as Types.ObjectId,
          });
          if (!section) {
            throw new HttpError(404, "Section not found");
          }

          const groupTd = await Group.findOne({
            name: group.name,
            type: group.type,
            idSection: section._id as Types.ObjectId,
          });
          if (!groupTd) {
            throw new HttpError(404, "Group not found");
          }

          userGroups.push(groupTd._id as Types.ObjectId);
        });
        user.group = userGroups;
      }

      await user.save();
      return user;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteUserById(id: string): Promise<UserModel> {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new HttpError(404, "User not found");
      }

      return deletedUser;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteUserByEmail(email: string): Promise<UserModel> {
    try {
      const deletedUser = await User.findOneAndDelete({ email: email });
      if (!deletedUser) {
        throw new HttpError(404, "User not found");
      }

      return deletedUser;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }

  static async deleteUserByMatricule(matricule: string): Promise<UserModel> {
    try {
      const deletedUser = await User.findOneAndDelete({ matricule: matricule });
      if (!deletedUser) {
        throw new HttpError(404, "User not found");
      }

      return deletedUser;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  }
}
