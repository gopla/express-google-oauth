import { IUser } from './user.type'
import { Document, Schema, model } from 'mongoose'

export type UserDocument = IUser & Document

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: 'user',
  }
)

export default model<UserDocument>('User', userSchema)
