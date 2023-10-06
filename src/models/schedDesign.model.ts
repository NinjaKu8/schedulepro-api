import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ISchedDesign {
  _id: Types.ObjectId;
  isActive: boolean;
  isPublic: boolean;
  isDefault: boolean;
  name: string|null;
  stripId: Types.ObjectId|null;
  dayId: Types.ObjectId|null;
  bannerId: Types.ObjectId|null;
  paletteId: Types.ObjectId|null;
  updatedAt?: Date;
}
interface ISchedDesignMethods {} // define methods here
interface ISchedDesignModel extends Model<ISchedDesign, {}, ISchedDesignMethods> {} // define static methods here

const schema = new Schema<ISchedDesign, ISchedDesignModel, ISchedDesignMethods>({
  isActive: {
    type: Boolean,
    default: true,
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    maxlength: [50, 'Design name cannot be longer than 50 characters'],
    trim: true
  },
  stripId: {
    type: Schema.Types.ObjectId, 
    ref: 'SchedStrip'
  },
  dayId: {
    type: Schema.Types.ObjectId, 
    ref: 'SchedStrip'
  },
  bannerId: {
    type: Schema.Types.ObjectId, 
    ref: 'SchedStrip'
  },
  paletteId: {
    type: Schema.Types.ObjectId, 
    ref: 'SchedPalette'
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const SchedDesign = model<ISchedDesign, ISchedDesignModel>('SchedDesign', schema)