import {Request, Response, NextFunction } from "express";
import { User } from "../models/User";

class UserController{
    async getById(req:Request,res:Response, next: NextFunction){
        const {id} = req.params;
        if(!id || !Number(id))
            return next(console.log("id is not number!"));
        
        const user = await User.findOne({where: {id}});

        return res.json(user);
    }

    async getAll(req:Request,res:Response, next: NextFunction){
        const users = await User.findAll();
        return res.json(users);
    }

    async create(req:Request,res:Response, next: NextFunction){
        const {name,password,teamId} = req.body;
        if(!name || !password || !teamId)
            return next(console.log("have not name or password or teamId!"));

        const new_user = await User.create({name,password,teamId});

        return res.json(new_user);
    }

    async update(req:Request,res:Response, next: NextFunction){
        const {id,name,password,teamId} = req.body;
        if(!id || !Number(id))
            return next(console.log("id is not number!"));
        if(!name || !password || !teamId)
            return next(console.log("have not name or password or teamId!"));

        const user = await User.update({name,password,teamId},{where: {id}});

        return res.json(user);
    }

    async delete(req:Request,res:Response, next: NextFunction){
        const {id} = req.body;
        if(!id || !Number(id))
            return next(console.log("id is not number!"));

        const user = await User.destroy({where: {id}});

        return res.json(user);
    }
}

export default new UserController();