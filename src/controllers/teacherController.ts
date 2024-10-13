import { Request, Response, NextFunction } from "express";
import userModel, {Role} from "../models/userModel";
import { ResponseStructure } from "../types/response";


export const addGrade = async (req: Request, res: Response, next: NextFunction) => {
    const {studentId, subject, grade} = req.body;
    try{
        const student = await userModel.findById(studentId);
        if(!student || student.role !== Role.Student){
            res.status(404).json(new ResponseStructure(false, {}, "Student not found."));
        }
        else{
            const gradeExists = student.grades.some(g => g.subject === subject);
            if(gradeExists){
                res.status(400).json(new ResponseStructure(false, {}, "Grade for this subject already exists."));
            }
    
            student.grades.push({subject, grade});
            await student.save();
    
            res.status(201).json(new ResponseStructure(true, student.grades));
        }
    }
    catch(error:any){
        next(error);
    }
};

export const editGrade = async (req: Request, res: Response, next: NextFunction) => {
    const {studentId, subject, grade} = req.body;
    try{
        const student = await userModel.findById(studentId);
        if(!student || student.role !== Role.Student){
            res.status(404).json(new ResponseStructure(false, {}, "Student not found."));
        }
        else{
            const gradeIndex = student.grades.findIndex(g => g.subject === subject);
            if(gradeIndex === -1){
                res.status(404).json(new ResponseStructure(false, {}, "Grade for this subject not found."));
            }

            student.grades[gradeIndex].grade = grade;
            await student.save();
            res.status(200).json(new ResponseStructure(true, student.grades));
            }
    }
    catch(error:any){
        next(error);
    }
};

export const deleteGrade = async (req: Request, res: Response, next: NextFunction) => {
    const {studentId, subject} = req.body;
    try{
        const student = await userModel.findById(studentId);
        if(!student || student.role !== Role.Student){
            res.status(404).json(new ResponseStructure(false, {}, "Student not found."))
        }
        else{
            const gradeIndex = student.grades.findIndex(g => g.subject === subject);
            if(gradeIndex === -1){
                res.status(404).json(new ResponseStructure(false, {}, "Grade for this subject not found."));
            }
    
            student.grades.splice(gradeIndex, 1);
            await student.save();
            res.status(200).json(new ResponseStructure(true, student.grades));
        }
    }
    catch (error: any) {
        next(error);
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await userModel.find().populate('class');
        res.status(200).json(new ResponseStructure(true, users))
    }
    catch(error:any){
        next(error);
    }
};

export const getStudentsGrades = async (req: Request, res: Response, next: NextFunction) => {
    const {studentId} = req.params;
    const studentIdStr = typeof studentId === 'string' ? studentId : String(studentId); 
    try{
        const student = await userModel.findById(studentIdStr).populate("class");
        if(!student || student.role !== Role.Student){
            res.status(404).json(new ResponseStructure(false, {}, "Student not found."))
        }
        else{
            res.status(200).json(new ResponseStructure(true, student.grades));
        }
    }
    catch(error:any){
        next(error);
    }
}

export const getStudentGradeAvg = async (req: Request, res: Response, next: NextFunction) => {
    const {studentId} = req.params;
    const studentIdStr = typeof studentId === 'string' ? studentId : String(studentId); 
    try{
        const student = await userModel.findById(studentIdStr).populate("class");
        if(!student || student.role !== Role.Student){
            res.status(404).json(new ResponseStructure(false, {}, "Student not found."))
        }
        else{
            const totalGrades = student.grades.reduce((acc, curr: any) => acc + curr.grade, 0);
            const avgGrades = student.grades.length > 0 ? totalGrades / student.grades.length : 0;
            res.status(200).json(new ResponseStructure(true, avgGrades));
        }
    }
    catch(error:any){
        next(error);
    }
}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    const {studentId} = req.params;
    const studentIdStr = typeof studentId === 'string' ? studentId : String(studentId); 
    try{
        const student = await userModel.findByIdAndDelete({ _id: studentIdStr, role: 'student' });
        if (!student) {
            res.status(404).json(new ResponseStructure(false, {}, "Student not found."));
        }

        res.status(200).json(new ResponseStructure(true, {}, "Student deleted"));
    }
     catch (error: any) {
        next(error);
    }
};