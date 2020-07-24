import { IProject } from './project.type'
import { Document, Schema, model } from 'mongoose'

export type ProjectDocument = IProject & Document

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'project',
    timestamps: true,
  }
)

export default model<ProjectDocument>('Project', projectSchema)
