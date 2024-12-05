import express, { Router} from "express";
import { web } from "./web";
import { api } from "./api";


export const router: Router = express.Router();

router.use("/",web);
router.use("/api",api);
