import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface ISchedPalette {
  _id: Types.ObjectId;
  isActive: boolean;
  isPublic: boolean;
  isDefault: boolean;
  name: string|null;
  stripColors: string[][];
  dayColor: string;
  bannerColor: string;
  updatedAt?: Date;
}
interface ISchedPaletteMethods {} // define methods here
interface ISchedPaletteModel extends Model<ISchedPalette, {}, ISchedPaletteMethods> {} // define static methods here

const schema = new Schema<ISchedPalette, ISchedPaletteModel, ISchedPaletteMethods>({
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
    maxlength: [50, 'Palette name cannot be longer than 50 characters'],
    trim: true
  },
  stripColors: [{
    type: Array,
  }],
  dayColor: {
    type: String,
    trim: true
  },
  bannerColor: {
    type: String,
    trim: true
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const SchedPalette = model<ISchedPalette, ISchedPaletteModel>('SchedPalette', schema)