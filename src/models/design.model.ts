import { model, Model, Schema, Types } from 'mongoose'

import { schemaOptions } from '../config/schemaOptions'

export interface IDesignHeight {
  auto: boolean;
  custom: number;
}
export interface IDesign {
  _id: Types.ObjectId;
  isActive: boolean;
  isPublic: boolean;
  name: string;
  height: IDesignHeight;
  updatedAt?: Date;
}
interface IDesignMethods {} // define methods here
interface IDesignModel extends Model<IDesign, {}, IDesignMethods> {} // define static methods here

const schema = new Schema<IDesign, IDesignModel, IDesignMethods>({
  isActive: {
    type: Boolean,
    default: true,
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    maxlength: [50, 'Strip name cannot be longer than 50 characters'],
    trim: true
  },
  height: {
    auto: {
      type: Boolean,
      default: false,
    },
    custom: {
      type: Number,
      default: 50
    }
  },
}, schemaOptions)

export const alertKeys = Object.keys(schema.paths) // array of keys of schema

export const Design = model<IDesign, IDesignModel>('Design', schema)