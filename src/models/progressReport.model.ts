import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IProgressReport {
  _id: Types.ObjectId;
  isActive: boolean;
  schedBoardId: Types.ObjectId;
  visualizationId: string;
  progressEventIds: Types.ObjectId[];
  updatedAt?: Date;
}
interface IProgressReportMethods {} // define methods here
interface IProgressReportModel extends Model<IProgressReport, {}, IProgressReportMethods> {} // define static methods here

const schema = new Schema<IProgressReport, IProgressReportModel, IProgressReportMethods>({
  isActive: {
    type: Boolean,
    default: true,
  },
  schedBoardId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'SchedBoard'
  },
  visualizationId: {
    type: String,
    default: null,
  },
  progressEventIds: [{
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'ProgressEvent'
  }],
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const ProgressReport = model<IProgressReport, IProgressReportModel>('ProgressReport', schema)