import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IProgress {
  _id: Types.ObjectId;
  projectId: Types.ObjectId;
  scheduleId: Types.ObjectId;
  schedScenarioId: Types.ObjectId;
  progressReportIds: Types.ObjectId[];
  updatedAt?: Date;
}
interface IProgressMethods {} // define methods here
interface IProgressModel extends Model<IProgress, {}, IProgressMethods> {} // define static methods here

const schema = new Schema<IProgress, IProgressModel, IProgressMethods>({
  projectId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'Project'
  },
  scheduleId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'Schedule'
  },
  schedScenarioId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedScenario'
  },
  progressReportIds: [{
    type: Schema.Types.ObjectId,
    ref: 'ProgressReport'
  }],
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const Progress = model<IProgress, IProgressModel>('Progress', schema)