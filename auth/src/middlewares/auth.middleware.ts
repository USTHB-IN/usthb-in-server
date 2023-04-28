import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "./error.middleware";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the JWT token from the Authorization header
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new HttpError(401, "Authorization token not found");
    }

    // Verify the token and extract the user ID and role
    const { id, role } = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    // Add the user ID and role to the request object
    req.user = { id, role };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
