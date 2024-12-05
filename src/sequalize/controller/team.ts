import {Request, Response, NextFunction } from "express";
import { Team } from "../models/Team";
import { User } from "../models/User";

class TeamController{
    async gen(req:Request,res:Response, next: NextFunction){
        if(!(await Team.findAll()).length){
            await Team.create({name: "Зенит"});
            await Team.create({name: "Спартак"});
            await Team.create({name: "ПСЖ"});
            await Team.create({name: "ЦСКА"});
            return res.json({"generated": true});
        }
        return res.json({"generated": false});
    }
    async getUsers(req:Request,res:Response, next: NextFunction){
        const {id} = req.params;
        if(!id || !Number(id))
            return next(console.log("id is not number!"));

        const team_with_users = await Team.findAll({ include: [User], where: {id:id} });
        return res.json(team_with_users);
    }
}

export default new TeamController();