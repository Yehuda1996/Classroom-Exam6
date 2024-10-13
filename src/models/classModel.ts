import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
  name: string;
  teacher?: Types.ObjectId;
  students: Types.ObjectId[];
}

const ClassSchema = new Schema<IClass>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teacher: {
    type: Types.ObjectId,
    ref: "User", // Reference to User model (Teacher)
    required: true,
  },
  students: [
    {
      type: Types.ObjectId,
      ref: "User", // Reference to User model (Students)
    },
  ],
});

export default mongoose.model<IClass>("Class", ClassSchema);
