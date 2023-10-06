import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IProgressEvent {
  _id: Types.ObjectId;
  shootDate: Date;
  progressEventTypeId: Types.ObjectId;
  progressDateTime: Date;
  updatedAt?: Date;
}
interface IProgressEventMethods {} // define methods here
interface IProgressEventModel extends Model<IProgressEvent, {}, IProgressEventMethods> {} // define static methods here

const schema = new Schema<IProgressEvent, IProgressEventModel, IProgressEventMethods>({
  shootDate: {
    type: Date,
    required: true,
  },
  progressEventTypeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ProgressEventType'
  },
  progressDateTime: {
    type: Date,
    required: true,
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const ProgressEvent = model<IProgressEvent, IProgressEventModel>('ProgressEvent', schema)