import mongoose, { Schema, Document, Types } from "mongoose";
import { IStudent} from "./studentModel";
import { ITeacher } from "./teacherModel";


export interface IClass extends Document {
   _id: Types.ObjectId;
   name: string,
   teacher?: string,
   students?: string[]
}


export const ClassSchema = new Schema<IClass> ({
   name: {
       type: String,
       required: [true, "Classroom name is required"],
       unique: true
   },
   teacher: {
        type: Types.ObjectId,
        ref: "Teacher",
        required: true
   },
   students: [{
        type: Types.ObjectId,
        ref: "Student"
   }]
})


export default mongoose.model<IClass>("Class", ClassSchema);