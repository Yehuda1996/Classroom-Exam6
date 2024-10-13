import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Teacher, { ITeacher } from '../models/teacherModel.js';
import Student, { IStudent } from '../models/studentModel.js';
import { ResponseStructure } from '../types/response.js';


export const registerTeacher = async (req: Request, res: Response, next: NextFunction) => {
   try{
       const teacher: ITeacher = await Teacher.create(req.body);


       const hashedPassword = await bcrypt.hash(teacher.password, 10);


       const response: ResponseStructure = new ResponseStructure(true, teacher);


       res.status(201).json({message: "New classroom created successfully", teacher: teacher});
   }
   catch(error){
       next(error)
   }
};


export const registerStudent = async (req: Request, res: Response, next: NextFunction) => {
   try{
       const student: IStudent = await Student.create(req.body);


       const hashedPassword = await bcrypt.hash(student.password, 10);


       const response: ResponseStructure = new ResponseStructure(true, student);


       res.status(201).json({message: "New student created successfully", student: student});
   }
   catch(error){
       next(error)
   }
};
