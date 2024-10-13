import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Teacher from "../models/teacherModel";
import Class from "../models/classModel";
import { ResponseStructure } from "../types/response";

export const registerTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {username, email, password, className} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newClass = await new Class({name: className});
        const newTeacher = new Teacher({
            username,
            email,
            password: hashedPassword,
            class: newClass
        });
        await newTeacher.save();
        res.status(201).json(new ResponseStructure(true, newTeacher));
    }
    catch(error){
        next(error);
    }
};