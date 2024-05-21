import express from "express";
import { UserController } from "../controllers/user.controller.js"
export const UserRouter = express.Router();
const userController = new UserController();
// TODO: have to add the functional call to handle the request
UserRouter.post("/login", (req, res, next) => {
    userController.login(req, res, next);
});

UserRouter.post("/register", (req, res, next) => {
    userController.register(req, res, next);
});