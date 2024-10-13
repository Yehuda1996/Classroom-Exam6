import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Student from "../models/studentModel";
import Class from "../models/classModel";
import { ResponseStructure } from "../types/response";

export const registerStudent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {username, email, password, className} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newClass = await new Class({name: className});
        const newStudent = new Student({
            username,
            email,
            password: hashedPassword,
            class: newClass
        });
        await newStudent.save();
        res.status(201).json(new ResponseStructure(true, newStudent));
    }
    catch(error){
        next(error);
    }
}