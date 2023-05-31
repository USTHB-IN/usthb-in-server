import { Request, Response, NextFunction } from "express";
import {
  DeleteSectionParams,
  SearchSectionParams,
  SectionService,
  UpdateSectionParams,
} from "../services/section.service";

export const createSection = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const section = await SectionService.createSection(req.body);
    res.status(201).json(section);
  } catch (error) {
    next(error);
  }
};

export const getAllSection = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sections = await SectionService.getAllSections();
    res.json(sections);
  } catch (error) {
    next(error);
  }
};

export const getAllSectionBySpecialite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sections = await SectionService.getAllSectionsBySpecialite(
      req.params.specialite
    );
    res.json(sections);
  } catch (error) {
    next(error);
  }
};

export const getAllSectionBySpecialiteId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sections = await SectionService.getAllSectionsBySpecialiteId(
      req.params.id
    );
    res.json(sections);
  } catch (error) {
    next(error);
  }
};

export const getSectionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const section = await SectionService.getSectionById(req.params.id);
    res.json(section);
  } catch (error) {
    next(error);
  }
};

export const getSectionByNameAndNameSpecialite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sectionSearch = {
      name: req.query.name as string,
      academicYear: req.query.academicYear as string,
      nameSpecialite: req.query.nameSpecialite as string,
    };
    const section = await SectionService.getSectionByNameAndNameSpecialite(
      sectionSearch
    );
    res.json(section);
  } catch (error) {
    next(error);
  }
};

export const updateSectionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const section = {
      name: req.body.name,
      nameSpecialite: req.body.nameSpecialite,
      academicYear: req.body.academicYear,
    };
    const updatedSection = await SectionService.updateSectionById(id, section);
    res.json(updatedSection);
  } catch (error) {
    next(error);
  }
};

export const updateSectionByNameAndNameSpecialite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sectionSearch: SearchSectionParams = {
      name: req.query.name as string,
      academicYear: req.query.academicYear as string,
      nameSpecialite: req.query.nameSpecialite as string,
    };
    const sectionUpdate: UpdateSectionParams = {
      name: req.body.name ?? undefined,
      academicYear: req.body.academicYear ?? undefined,
      nameSpecialite: req.body.nameSpecialite ?? undefined,
    };
    const updatedSection =
      await SectionService.updateSectionByNameAndNameSpecialite(
        sectionSearch,
        sectionUpdate
      );
    res.json(updatedSection);
  } catch (error: any) {
    next(error);
  }
};

export const deleteSectionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sectionId = req.params.id;
    const deletedSection = await SectionService.deleteSectionById(sectionId);

    res.status(200).json(deletedSection);
  } catch (error) {
    next(error);
  }
};

export const deleteSectionByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const section: DeleteSectionParams = {
      name: req.query.name as string,
      academicYear: req.query.academicYear as string,
      nameSpecialite: req.query.nameSpecialite as string,
    };
    const deletedSection = await SectionService.deleteSectionByName(section);
    res.status(200).json(deletedSection);
  } catch (error) {
    next(error);
  }
};
