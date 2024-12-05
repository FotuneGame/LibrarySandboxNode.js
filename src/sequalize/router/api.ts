import express, { Router} from "express";
import UserController from "../controller/user";
import TeamController from "../controller/team";
import ProfileController from "../controller/profile";


export const api: Router = express.Router();


api.get("/user/:id",UserController.getById);
api.get("/users",UserController.getAll);
api.post("/user/create",UserController.create);
api.put("/user/update",UserController.update);
api.delete("/user/delete",UserController.delete);

api.get("/team/generate",TeamController.gen);
api.get("/team/users/:id",TeamController.getUsers);

api.get("/profile/generate",ProfileController.gen);
api.get("/profile/user/:userId",ProfileController.getProfileUser);
api.post("/profile/add",ProfileController.createProfileFormUser);
api.delete("/profile/delete",ProfileController.deleteProfileFormUser);