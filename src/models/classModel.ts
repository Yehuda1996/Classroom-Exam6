import mongoose, { Schema, Document, Types } from "mongoose";
import { IStudent} from "./studentModel";


export interface IClass extends Document {
   _id: Types.ObjectId;
   name: string,
   students?: IStudent[]
}


export const ClassSchema = new Schema<IClass> ({
   name: {
       type: String,
       required: [true, "Classroom name is required"],
       unique: true
   },
   students: {
       type: Types.ObjectId,
       ref: "Student",
       default: []
   }
})


export default mongoose.model<IClass>("Class", ClassSchema);