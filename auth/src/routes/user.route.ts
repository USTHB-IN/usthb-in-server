import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

// Create a new user
router.post("/", userController.createUser);

// Get a user by ID
router.get("/id/:id", userController.getUserById);

// Get all users
router.get("/", userController.getAllUsers);

// Get all users by section ID
router.get("/section/:id", userController.getAllUsersBySectionId);

// Get all users by section
router.get("/section", userController.getAllUsersBySection);

// Get all users by group ID
router.get("/group/:id", userController.getAllUsersByGroupId);

// Update a user by ID
router.put("/id/:id", userController.updateUserById);

// Update a user by email
router.put("/email/:email", userController.updateUserByEmail);

// Update a user by matricule
router.put("/matricule/:matricule", userController.updateUserByMatricule);

// Delete a user by ID
router.delete("/id/:id", userController.deleteUserById);

// Delete a user by email
router.delete("/email/:email", userController.deleteUserByEmail);

// Delete a user by matricule
router.delete("/matricule/:matricule", userController.deleteUserByMatricule);

export default router;
