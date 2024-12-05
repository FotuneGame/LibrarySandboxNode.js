import {Request, Response, NextFunction } from "express";
import { Profile } from "../models/Profile";
import { User } from "../models/User";
import { UserToProfile } from "../models/UserToProfile";

class ProfileController{
    async gen(req:Request,res:Response, next: NextFunction){
        if(!(await Profile.findAll()).length){
            await Profile.create({name: "Профиль А"});
            await Profile.create({name: "Профиль Б"});
            await Profile.create({name: "Профиль В"});
            await Profile.create({name: "Профиль Г"});
            return res.json({"generated": true});
        }
        return res.json({"generated": false});
    }
    
    async getProfileUser(req:Request,res:Response, next: NextFunction){
        const {userId} = req.params;
        if(!userId)
            return next(console.log("userId is have not!!! (getProfileUser)"))

        const result = await User.findByPk(userId,{include:[Profile]});
        
        return res.json(result);
    }

    async createProfileFormUser(req:Request,res:Response, next: NextFunction){
        const {userId, profileId} = req.body;
        if(!userId || !profileId)
            return next(console.log("userId or profileId is have not!!! (createProfileFormUser)"))

        const result = await UserToProfile.create({userId,profileId});

        return res.json(result);
    }

    async deleteProfileFormUser(req:Request,res:Response, next: NextFunction){
        const {userId, profileId} = req.body;
        if(!userId || !profileId)
            return next(console.log("userId or profileId is have not!!! (deleteProfileFormUser)"))

        const result = await UserToProfile.destroy({where:{userId,profileId}});

        return res.json(result);
    }
}

export default new ProfileController();