import express, { Router} from "express";
import { routerReq } from "./routerReq";
import { routerSend } from "./routerSend";


export const router: Router = express.Router();

router.use("/",routerSend);
router.use("/api",routerReq);

