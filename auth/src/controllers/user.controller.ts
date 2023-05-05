import { NextFunction, Request, Response } from "express";
import {
  CreateUserParams,
  UpdateUserParams,
  UserService,
} from "../services/user.services";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser: CreateUserParams = req.body;
    const user = await UserService.createUser(newUser);
    res.status(201).json(user);
  } catch (error: any) {
    next(error);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const user = await UserService.getUserById(id);
    res.json(user);
  } catch (error: any) {
    next(error);
  }
}

export async function getUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.params.email;
    const user = await UserService.getUserByEmail(email);
    res.json(user);
  } catch (error: any) {
    next(error);
  }
}

export async function getUserByMatricule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const matricule = req.params.matricule;
    const user = await UserService.getUserByMatricule(matricule);
    res.json(user);
  } catch (error: any) {
    next(error);
  }
}

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    next(error);
  }
}

export async function getAllUsersBySectionId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const users = await UserService.getAllUsersBySectionId(id);
    res.json(users);
  } catch (error: any) {
    next(error);
  }
}

export async function getAllUsersBySection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const section = req.query.section as string;
    const academicYear = req.query.academicYear as string;
    const nameSpecialite = req.query.nameSpecialite as string;
    const users = await UserService.getAllUsersBySection({
      name: section,
      academicYear,
      nameSpecialite,
    });
    res.json(users);
  } catch (error: any) {
    next(error);
  }
}

export async function getAllUsersByGroupId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const users = await UserService.getAllUsersByGroupId(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getAllUsersByGroup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const name: string = req.query.name as string;
    const type: string = req.query.type as string;
    const nameSection: string = req.query.nameSection as string;
    const academicYear: string = req.query.academicYear as string;
    const nameSpecialite: string = req.query.nameSpecialite as string;
    const users = await UserService.getAllUsersByGroup({
      name: name,
      type: type,
      nameSection: nameSection,
      academicYear: academicYear,
      nameSpecialite: nameSpecialite,
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function updateUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const updates: UpdateUserParams = req.body;
    const user = await UserService.updateUserById(id, updates);
    res.json(user);
  } catch (error: any) {
    next(error);
  }
}

export async function updateUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const email = req.params.email;
    const updateUser: UpdateUserParams = req.body;

    const updatedUser = await UserService.updateUserByEmail(email, updateUser);

    res.status(200).json(updatedUser);
  } catch (error: any) {
    next(error);
  }
}

export async function updateUserByMatricule(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const matricule = req.params.matricule;
    const updateUser: UpdateUserParams = req.body;

    const updatedUser = await UserService.updateUserByMatricule(
      matricule,
      updateUser
    );

    res.status(200).json(updatedUser);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const deletedUser = await UserService.deleteUserById(id);

    res.status(200).json(deletedUser);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.params.email;
    const deletedUser = await UserService.deleteUserByEmail(email);

    res.status(200).json(deletedUser);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteUserByMatricule(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const matricule = req.params.matricule;
    const deletedUser = await UserService.deleteUserByMatricule(matricule);

    res.status(200).json(deletedUser);
  } catch (error: any) {
    next(error);
  }
}
