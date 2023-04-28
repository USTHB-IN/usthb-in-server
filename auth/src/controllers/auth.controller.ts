import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import { UserModel } from "../models/user.model";

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    res.status(200).json({ token });
  } catch (error: any) {
    next(error);
  }
}

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userData = req.body;
  try {
    const newUser = await authService.signup(userData);
    res.status(201).json({ user: newUser });
  } catch (error: any) {
    next(error);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { oldPassword, newPassword } = req.body;
  if (!req.user) {
    res.status(401).json({ message: "User not authenticated." });
  }

  const id = req.user?.id as string;
  try {
    await authService.changePassword({ id, oldPassword, newPassword });
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
}
