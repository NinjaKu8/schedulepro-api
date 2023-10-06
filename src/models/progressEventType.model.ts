import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IProgressEventType {
  _id: Types.ObjectId;
  name: string;
  valueType: 'start' | 'mealStart' | 'wrap';
  updatedAt?: Date;
}
interface IProgressEventTypeMethods {} // define methods here
interface IProgressEventTypeModel extends Model<IProgressEventType, {}, IProgressEventTypeMethods> {} // define static methods here

const schema = new Schema<IProgressEventType, IProgressEventTypeModel, IProgressEventTypeMethods>({
  name: {
    type: String,
    default: null,
  },
  valueType: {
    type: String,
    required: true,
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const ProgressEventType = model<IProgressEventType, IProgressEventTypeModel>('ProgressEventType', schema)