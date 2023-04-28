import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, UserModel } from "../models/user.model";
import { HttpError } from "../middlewares/error.middleware";
import { CreateUserParams, UserService } from "./user.services";

interface LoginParams {
  email: string;
  password: string;
}

interface ChangePasswordParams {
  id: string;
  oldPassword: string;
  newPassword: string;
}

const authService = {
  async signup(newUser: CreateUserParams): Promise<UserModel> {
    try {
      const user = await UserService.createUser(newUser);
      return user;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  },

  async login(params: LoginParams): Promise<string> {
    try {
      const { email, password } = params;

      // Find the user by email
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        throw new HttpError(401, "Invalid email or password");
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new HttpError(401, "Invalid email or password");
      }

      // Generate a JWT token
      var role: string = "";
      switch (user.email) {
        case "@admin.usthb.dz":
          role = "admin";
          break;
        case "@etu.usthb.dz":
          role = "student";
          break;
        case "@usthb.dz":
          role = "teacher";
        default:
          throw new HttpError(401, "Invalid email or password");
      }

      const token = jwt.sign(
        { id: user.id, role: role },
        process.env.JWT_SECRET!
      );

      return token;
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  },

  async changePassword(params: ChangePasswordParams): Promise<void> {
    try {
      const { id, oldPassword, newPassword } = params;

      // Find the user by id
      const user = await UserService.getUserById(id);
      if (!user) {
        throw new HttpError(404, "User not found");
      }

      // Compare the old password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        throw new HttpError(401, "Invalid old password");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(
        newPassword,
        process.env.BCRYPT_SALT_ROUNDS
          ? parseInt(process.env.BCRYPT_SALT_ROUNDS)
          : 20
      );

      // Update the user's password
      user.password = hashedPassword;
      await user.save();
    } catch (error: any) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, error.message);
    }
  },
};

export default authService;
