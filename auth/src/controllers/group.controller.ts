import { NextFunction, Request, Response } from "express";
import {
  GroupService,
  SearchGroupParams,
  UpdateGroupParams,
} from "../services/groupe.service";

export const createGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, type, nameSection, academicYear, nameSpecialite } = req.body;
    const newGroup = await GroupService.createGroup({
      name,
      type,
      nameSection,
      academicYear,
      nameSpecialite,
    });
    res.status(201).json(newGroup);
  } catch (error: any) {
    next(error);
  }
};

export const getAllGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await GroupService.getAllGroups();
    res.status(200).json(groups);
  } catch (error: any) {
    next(error);
  }
};

export const getAllGroupsBySection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nameSection, academicYear, nameSpecialite } = req.query;
    const groups = await GroupService.getAllGroupsBySection({
      nameSection: nameSection as string,
      academicYear: academicYear as string,
      nameSpecialite: nameSpecialite as string,
    });
    res.status(200).json(groups);
  } catch (error: any) {
    next(error);
  }
};

export const getGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const group = await GroupService.getGroupById(id);
    res.status(200).json(group);
  } catch (error: any) {
    next(error);
  }
};

export const getGroupByNameAndSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, type, nameSection, academicYear, nameSpecialite } = req.query;
    const group = await GroupService.getGroupByNameAndSection({
      name: name as string,
      type: type as string,
      nameSection: nameSection as string,
      academicYear: academicYear as string,
      nameSpecialite: nameSpecialite as string,
    });
    res.status(200).json(group);
  } catch (error: any) {
    next(error);
  }
};

export const updateGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, type, nameSection, academicYear, nameSpecialite } = req.body;
    const updatedGroup = await GroupService.updateGroupById(id, {
      name,
      type,
      nameSection,
      academicYear,
      nameSpecialite,
    });
    res.status(200).json(updatedGroup);
  } catch (error: any) {
    next(error);
  }
};

export const updateGroupByNameAndSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupSearch: SearchGroupParams = {
      name: req.query.name as string,
      type: req.query.type as string,
      nameSection: req.query.nameSection as string,
      academicYear: req.query.academicYear as string,
      nameSpecialite: req.query.nameSpecialite as string,
    };
    const groupUpdate: UpdateGroupParams = {
      name: req.body.name,
      type: req.body.type,
      nameSection: req.body.nameSection,
      academicYear: req.body.academicYear,
      nameSpecialite: req.body.nameSpecialite,
    };
    const group = await GroupService.updateGroupByNameAndSection(
      groupSearch,
      groupUpdate
    );

    res.status(200).json(group);
  } catch (error: any) {
    next(error);
  }
};

export const deleteGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const group = await GroupService.deleteGroupById(id);
    res.status(200).json(group);
  } catch (error: any) {
    next(error);
  }
};

export const deleteGroupByNameAndSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, type, nameSection, academicYear, nameSpecialite } = req.query;
    const group = await GroupService.deleteGroupByNameAndSection({
      name: name as string,
      type: type as string,
      nameSection: nameSection as string,
      academicYear: academicYear as string,
      nameSpecialite: nameSpecialite as string,
    });
    res.status(200).json(group);
  } catch (error: any) {
    next(error);
  }
};
