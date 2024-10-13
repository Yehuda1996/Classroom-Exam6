import mongoose, { Schema, Document, Types } from "mongoose";

export enum Role {
  Student = "student",
  Teacher = "teacher",
}

interface Grade {
  subject: string;
  grade: number;
}

export interface IUser extends Document {
  fullName: string;
  passportId: string;
  password: string;
  grades: Grade[];
  role: Role;
  class?: Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  passportId: {
    type: String,
    required: [true, "Passport ID is required"],
    minLength: 9,
    maxLength: 9,
    match: /^[0-9]{9}$/,
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