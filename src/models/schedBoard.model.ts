import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ISchedBoard {
  _id: Types.ObjectId;
  isPublished: boolean;
  isRecycle: boolean;
  name: string;
  episode: string|null;
  schedBreakdownsOrdered: Types.ObjectId[];
  updatedAt?: Date;
}
interface ISchedBoardMethods {} // define methods here
interface ISchedBoardModel extends Model<ISchedBoard, {}, ISchedBoardMethods> {} // define static methods here

const schema = new Schema<ISchedBoard, ISchedBoardModel, ISchedBoardMethods>({
  isPublished: {
    type: Boolean,
    default: false,
  },
  isRecycle: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    maxlength: [100, 'Board names cannot be longer than 100 characters'],
    trim: true,
    default: 'Board'
  },
  schedBreakdownsOrdered: [{
    type: Schema.Types.ObjectId,
    ref: 'SchedBreakdown',
    default: null
  }],
  episode: {
    type: String,
    maxlength: [100, 'Board episode names cannot be longer than 100 characters'],
    default: null,
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const SchedBoard = model<ISchedBoard, ISchedBoardModel>('SchedBoard', schema)