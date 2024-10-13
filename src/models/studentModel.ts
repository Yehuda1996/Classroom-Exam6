import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";


export interface IStudent extends Document {
   _id: Types.ObjectId;
   username: string;
   email: string;
   password: string,
   class?: Types.ObjectId
}


const StudentSchema = new Schema<IStudent> ({
   username: {
       type: String,
       required: [true, "username is required."],
       unique: true,
       minlength: [3, "username must be at least 3 chars long"],
       maxlength: [30, "username cannot exceed 30 chars!"],
       match: [/^[a-zA-Z0-9]+§/, "username can only contain letters and numbers"]
   },
   email: {
       type: String,
       required: [true, "email is required."],
       unique: true,
       validate: {
         validator: function (value: string){
           return validator.isEmail(value);
         },
         message: "Please provide valid email address"
       }
   },
   password: {
       type: String,
       required: [true, "Password is required"],
       minlength: [8, "password must be at least 8 characters long"],
       match: [
           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
           'Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long']
   },
   class: {
       type: Types.ObjectId,
       ref: "Class",
       required: [true, "Providing a class is required"]
   }
})


export default mongoose.model<IStudent>("Student", StudentSchema);