import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ISchedBreakdown {
  _id: Types.ObjectId;
  breakdownIds: Types.ObjectId[];
  scheduleId: Types.ObjectId|null;
  updatedAt?: Date;
}
interface ISchedBreakdownMethods {} // define methods here
interface ISchedBreakdownModel extends Model<ISchedBreakdown, {}, ISchedBreakdownMethods> {} // define static methods here

const schema = new Schema<ISchedBreakdown, ISchedBreakdownModel, ISchedBreakdownMethods>({
  breakdownIds: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Breakdown'
  }],
  scheduleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Schedule'
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const SchedBreakdown = model<ISchedBreakdown, ISchedBreakdownModel>('SchedBreakdown', schema)