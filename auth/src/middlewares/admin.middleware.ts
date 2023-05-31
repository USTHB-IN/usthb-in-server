import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from '../middlewares/error.middleware';

const adminOnlyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(new HttpError(401, 'Authorization token is required'));
  }

  try {
    // Verify the JWT token and get the user's role
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    const userRole = decodedToken.role;

    // Check if the user is an admin
    if (userRole !== 'admin') {
      return next(new HttpError(403, 'Access forbidden'));
    }

    // User is authorized, move on to the next middleware or route handler
    return next();
  } catch (err) {
    return next(new HttpError(401, 'Invalid authorization token'));
  }
};

export default adminOnlyMiddleware;
