import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ISchedPaneSet {
  _id: Types.ObjectId;
  isDefault: boolean;
  name: string;
  paneSet: object;
  updatedAt?: Date;
}
interface ISchedPaneSetMethods {} // define methods here
interface ISchedPaneSetModel extends Model<ISchedPaneSet, {}, ISchedPaneSetMethods> {} // define static methods here

const schema = new Schema<ISchedPaneSet, ISchedPaneSetModel, ISchedPaneSetMethods>({
  isDefault: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true
  },
  paneSet: {
    type: Object,
    required: true
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const SchedPaneSet = model<ISchedPaneSet, ISchedPaneSetModel>('SchedPaneSet', schema)