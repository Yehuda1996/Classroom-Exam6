import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Teacher, { ITeacher } from '../models/teacherModel';
import Student, { IStudent } from '../models/studentModel';
import { ResponseStructure } from '../types/response';


export const login = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const {email, password} = req.body;

        const user: IStudent | ITeacher | null = await Teacher.findOne({email}) || await Student.findOne({email});
        if(!user){
            res.status(401).json({error: "Invalid credentials"});
        }
        else{
            const isUser = await bcrypt.compare(password, user.password);
            if(!isUser) res.status(401).json({error: "Invalid credentials"});
            const token = jwt.sign(
                {userId: user._id, role: user instanceof Teacher? 'teacher': 'student'},
                'SECRET'
            );
            res.cookie('token', token).json(new ResponseStructure(true, token));
        }
    }
    catch(error){
        next(error)
    }
}