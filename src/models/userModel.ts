import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export enum Role {
  Student = "student",
  Teacher = "teacher",
}

interface Grade {
  subject: string;
  grade: number;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  grades: Grade[];
  role: Role;
  class?: Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
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
  },
  grades: {
    type: [{ subject: { type: String }, grade: { type: Number } }],
  },
  role: {
    type: String,
    enum: Object.values(Role),
    required: true,
  },
  class: {
    type: Types.ObjectId,
    ref: "Class"
  }
});


export default mongoose.model<IUser>("User", UserSchema);